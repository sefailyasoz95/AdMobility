import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export async function hasRegisteredVehicle(userId: string): Promise<boolean> {
	try {
		// Fetch vehicles for the user
		const response = await fetch(`/api/vehicles?ownerId=${userId}`);

		if (!response.ok) {
			console.error("Error checking vehicle registration:", await response.text());
			return false;
		}

		const data = await response.json();

		// Check if the user has at least one vehicle
		return Array.isArray(data.vehicles) && data.vehicles.length > 0;
	} catch (error) {
		console.error("Error checking vehicle registration:", error);
		return false;
	}
}
