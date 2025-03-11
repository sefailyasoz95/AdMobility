import { NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase";

export async function GET(request: Request, { params }: { params: { id: string } }) {
	try {
		const userId = params.id;

		if (!userId) {
			return NextResponse.json({ error: "User ID is required" }, { status: 400 });
		}

		const supabase = await createServerSupabaseClient();

		// Get the current session
		const {
			data: { session },
		} = await supabase.auth.getSession();

		if (!session) {
			return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
		}

		// Verify the user is requesting their own data or has admin privileges
		if (session.user.id !== userId) {
			// Check if user has admin role (optional)
			// const { data: userData } = await supabase.from("users").select("role").eq("id", session.user.id).single();
			// if (userData?.role !== "admin") {
			return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
			// }
		}

		// Get the advertiser profile
		const { data: advertiser, error } = await supabase.from("advertisers").select("*").eq("user_id", userId).single();

		if (error) {
			console.error("Error fetching advertiser profile:", error);
			return NextResponse.json({ error: "Failed to fetch advertiser profile" }, { status: 500 });
		}

		return NextResponse.json({ advertiser });
	} catch (error) {
		console.error("Error in advertiser API:", error);
		return NextResponse.json({ error: "Internal server error" }, { status: 500 });
	}
}
