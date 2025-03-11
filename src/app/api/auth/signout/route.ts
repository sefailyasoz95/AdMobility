import { createServerSupabaseClient } from "@/lib/supabase";
import { NextResponse } from "next/server";

export async function POST() {
	try {
		const supabase = await createServerSupabaseClient();

		const { error } = await supabase.auth.signOut();

		if (error) {
			return NextResponse.json({ error: error.message }, { status: 400 });
		}

		return NextResponse.json({
			success: true,
		});
	} catch (error) {
		console.error("Error in signout API:", error);
		return NextResponse.json({ error: "Internal server error" }, { status: 500 });
	}
}
