import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import type { AdvertiserRegistrationForm } from "@/lib/types";

export async function POST(request: Request) {
	try {
		const body: AdvertiserRegistrationForm = await request.json();

		let response = NextResponse.next({
			request: {
				headers: request.headers,
			},
		});

		const cookieStore = await cookies();

		const supabase = createServerClient(process.env.SUPABASE_PROJECT_URL!, process.env.SUPABASE_API_KEY!, {
			cookies: {
				get(name: string) {
					return cookieStore.get(name)?.value;
				},
				set(name: string, value: string, options: CookieOptions) {
					cookieStore.set(name, value, options);
					response.cookies.set(name, value, options);
				},
				remove(name: string, options: CookieOptions) {
					cookieStore.delete(name);
					response.cookies.delete(name);
				},
			},
		});

		// First, create the user in Supabase Auth
		const { data: authData, error: authError } = await supabase.auth.signUp({
			email: body.email,
			password: body.password,
			options: {
				data: {
					full_name: body.full_name,
					phone_number: body.phone_number,
					role: "advertiser",
				},
			},
		});

		if (authError) {
			console.error("Auth error:", authError);
			return NextResponse.json({ error: "Authentication failed" }, { status: 400 });
		}

		// If auth was successful, create the user profile in the database
		const { data: profileData, error: profileError } = await supabase
			.from("users")
			.insert([
				{
					id: authData.user?.id,
					full_name: body.full_name,
					email: body.email,
					phone_number: body.phone_number,
					role: "advertiser",
				},
			])
			.select()
			.single();

		if (profileError) {
			console.error("Profile creation error:", profileError);
			// If profile creation fails, we should clean up the auth user
			await supabase.auth.admin.deleteUser(authData.user!.id);
			return NextResponse.json({ error: "Failed to create user profile" }, { status: 400 });
		}

		// Create the advertiser profile with company information
		const { data: advertiserData, error: advertiserError } = await supabase
			.from("advertisers")
			.insert([
				{
					user_id: authData.user?.id,
					company_name: body.company.company_name,
					website: body.company.website,
					industry: body.company.industry,
				},
			])
			.select()
			.single();

		if (advertiserError) {
			console.error("Advertiser profile creation error:", advertiserError);
			// If advertiser profile creation fails, clean up the user and auth
			await supabase.from("users").delete().eq("id", authData.user?.id);
			await supabase.auth.admin.deleteUser(authData.user!.id);
			return NextResponse.json({ error: "Failed to create advertiser profile" }, { status: 400 });
		}

		return NextResponse.json({
			message: "Registration successful",
			user: profileData,
			advertiser: advertiserData,
		});
	} catch (error) {
		console.error("Server error:", error);
		return NextResponse.json({ error: "Internal server error" }, { status: 500 });
	}
}
