import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

// Browser client for client components

// Server client for server components and API routes
export const createServerSupabaseClient = async () => {
	const cookieStore = await cookies();
	console.log("process.env.SUPABASE_PROJECT_URL: ", process.env.SUPABASE_PROJECT_URL);

	return createServerClient(process.env.SUPABASE_PROJECT_URL!, process.env.SUPABASE_API_KEY!, {
		cookies: {
			get(name: string) {
				return cookieStore.get(name)?.value;
			},
		},
	});
};
