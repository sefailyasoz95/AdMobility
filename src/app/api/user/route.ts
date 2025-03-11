import { createBrowserClient } from "@supabase/ssr";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
	try {
		const supabase = createBrowserClient(process.env.SUPABASE_PROJECT_URL!, process.env.SUPABASE_API_KEY!);

		// Get the current session
		const {
			data: { session },
		} = await supabase.auth.getSession();

		if (!session) {
			return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
		}

		// Get the user data from the database
		const { data: userData, error } = await supabase.from("users").select("*").eq("id", session.user.id).single();

		if (error) {
			console.error("Error fetching user data:", error);
			return NextResponse.json({ error: "Failed to fetch user data" }, { status: 500 });
		}

		return NextResponse.json({ user: userData });
	} catch (error) {
		console.error("Error in user API:", error);
		return NextResponse.json({ error: "Internal server error" }, { status: 500 });
	}
}
