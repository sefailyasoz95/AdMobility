import { NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase";

export async function GET(request: Request) {
	try {
		const { searchParams } = new URL(request.url);
		const ownerId = searchParams.get("ownerId");

		if (!ownerId) {
			return NextResponse.json({ error: "Owner ID is required" }, { status: 400 });
		}

		const supabase = await createServerSupabaseClient();
		const {
			data: { session },
		} = await supabase.auth.getSession();

		if (!session) {
			return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
		}

		// Check if user is requesting their own data or is an admin
		if (session.user.id !== ownerId && session.user.user_metadata.role !== "admin") {
			return NextResponse.json({ error: "Forbidden" }, { status: 403 });
		}

		// Fetch vehicles for the owner
		const { data: vehicles, error } = await supabase.from("vehicles").select("*").eq("owner_id", ownerId);

		if (error) {
			console.error("Error fetching vehicles:", error);
			return NextResponse.json({ error: "Failed to fetch vehicles" }, { status: 500 });
		}

		return NextResponse.json({ vehicles });
	} catch (error) {
		console.error("Unexpected error:", error);
		return NextResponse.json({ error: "Internal server error" }, { status: 500 });
	}
}

export async function POST(request: Request) {
	try {
		const supabase = await createServerSupabaseClient();
		const {
			data: { session },
		} = await supabase.auth.getSession();

		if (!session) {
			return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
		}

		// Parse the form data
		const formData = await request.formData();
		const owner_id = formData.get("owner_id") as string;
		const make = formData.get("make") as string;
		const model = formData.get("model") as string;
		const year = formData.get("year") as string;
		const color = formData.get("color") as string;
		const plate_number = formData.get("plate_number") as string;
		const vin = formData.get("vin") as string;
		const mileage = formData.get("mileage") as string;
		const avg_daily_miles = formData.get("avg_daily_miles") as string;
		const vehicle_type = formData.get("vehicle_type") as string;
		const primary_location = formData.get("primary_location") as string;
		const description = (formData.get("description") as string) || null;
		const image = formData.get("image") as File;

		// Validate required fields
		if (!owner_id || !make || !model || !year || !color || !plate_number || !vin || !vehicle_type) {
			return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
		}

		// Check if user is registering their own vehicle or is an admin
		if (session.user.id !== owner_id && session.user.user_metadata.role !== "admin") {
			return NextResponse.json({ error: "Forbidden" }, { status: 403 });
		}

		// Upload the image to Supabase Storage
		let image_url = null;
		if (image) {
			const fileExt = image.name.split(".").pop();
			const fileName = `${owner_id}_${Date.now()}.${fileExt}`;

			const { data: uploadData, error: uploadError } = await supabase.storage
				.from("vehicle-images")
				.upload(fileName, image);

			if (uploadError) {
				console.error("Error uploading image:", uploadError);
				return NextResponse.json({ error: "Failed to upload image" }, { status: 500 });
			}

			// Get the public URL
			const {
				data: { publicUrl },
			} = supabase.storage.from("vehicle-images").getPublicUrl(fileName);

			image_url = publicUrl;
		}

		// Insert the vehicle record
		const { data: vehicle, error } = await supabase
			.from("vehicles")
			.insert({
				owner_id,
				make,
				model,
				year: parseInt(year),
				color,
				plate_number,
				vin,
				mileage: parseInt(mileage),
				avg_daily_miles: parseInt(avg_daily_miles),
				vehicle_type,
				primary_location,
				description,
				image_url,
				status: "pending_approval", // Default status
				created_at: new Date().toISOString(),
			})
			.select()
			.single();

		if (error) {
			console.error("Error inserting vehicle:", error);
			return NextResponse.json({ error: "Failed to register vehicle" }, { status: 500 });
		}

		// Update the user's role to "vehicle_owner" if not already set
		const { error: userUpdateError } = await supabase
			.from("users")
			.update({ role: "vehicle_owner" })
			.eq("id", owner_id)
			.is("role", null);

		if (userUpdateError) {
			console.error("Error updating user role:", userUpdateError);
			// Continue anyway, this is not critical
		}

		return NextResponse.json({
			message: "Vehicle registered successfully",
			vehicle,
		});
	} catch (error) {
		console.error("Unexpected error:", error);
		return NextResponse.json({ error: "Internal server error" }, { status: 500 });
	}
}
