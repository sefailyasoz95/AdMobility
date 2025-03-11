import { createServerSupabaseClient } from "@/lib/supabase";
import { NextResponse } from "next/server";

export async function GET() {
	try {
		const supabase = await createServerSupabaseClient();

		// Get the current session
		const {
			data: { session },
		} = await supabase.auth.getSession();

		if (!session) {
			return NextResponse.json({ user: null, userRole: null });
		}

		// Get the user data from the database
		const { data: userData, error } = await supabase.from("users").select("*").eq("id", session.user.id).single();

		if (error) {
			console.error("Error fetching user data:", error);
			return NextResponse.json({ user: null, userRole: null });
		}

		return NextResponse.json({
			user: userData,
			userRole: userData.role,
		});
	} catch (error) {
		console.error("Error in session API:", error);
		return NextResponse.json({ error: "Internal server error" }, { status: 500 });
	}
}
