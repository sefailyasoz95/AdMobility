"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { toast } from "sonner";
import type { User } from "@/lib/types";

type AuthContextType = {
	user: User | null;
	userRole: "vehicle_owner" | "advertiser" | null;
	isLoading: boolean;
	hasVehicle: boolean;
	signIn: (email: string, password: string) => Promise<void>;
	signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
	const [user, setUser] = useState<User | null>(null);
	const [userRole, setUserRole] = useState<"vehicle_owner" | "advertiser" | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const [hasVehicle, setHasVehicle] = useState(false);
	const router = useRouter();
	const pathname = usePathname();

	useEffect(() => {
		const fetchUserData = async () => {
			try {
				setIsLoading(true);

				// Fetch session data from the API
				const response = await fetch("/api/auth/session");
				const data = await response.json();

				if (data.user) {
					setUser(data.user);
					setUserRole(data.userRole);

					// If user is a vehicle owner, check if they have registered a vehicle
					if (data.userRole === "vehicle_owner") {
						const vehicleResponse = await fetch(`/api/vehicles?ownerId=${data.user.id}`);
						if (vehicleResponse.ok) {
							const vehicleData = await vehicleResponse.json();
							const hasRegisteredVehicle = Array.isArray(vehicleData.vehicles) && vehicleData.vehicles.length > 0;
							setHasVehicle(hasRegisteredVehicle);
						}
					}
				} else {
					setUser(null);
					setUserRole(null);
					setHasVehicle(false);
				}
			} catch (error) {
				console.error("Error fetching user data:", error);
				setUser(null);
				setUserRole(null);
				setHasVehicle(false);
			} finally {
				setIsLoading(false);
			}
		};

		fetchUserData();

		// Set up an interval to check the session every 5 minutes
		const interval = setInterval(fetchUserData, 5 * 60 * 1000);

		return () => clearInterval(interval);
	}, []);

	// Redirect vehicle owners without a vehicle to the registration page
	useEffect(() => {
		if (!isLoading && user && userRole === "vehicle_owner" && !hasVehicle) {
			const allowedPaths = ["/dashboard/vehicle/new", "/onboarding/vehicle-info", "/api", "/logout"];

			// Check if the current path is allowed
			const isAllowedPath = allowedPaths.some((path) => pathname?.startsWith(path));

			if (!isAllowedPath && pathname !== "/dashboard/vehicle/new") {
				toast.info("Please register your vehicle to continue");
				router.push("/dashboard/vehicle/new");
			}
		}
	}, [isLoading, user, userRole, hasVehicle, pathname, router]);

	const signIn = async (email: string, password: string) => {
		try {
			const response = await fetch("/api/auth/signin", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ email, password }),
			});

			const data = await response.json();

			if (!response.ok) {
				toast.error(data.error || "Failed to sign in");
				throw new Error(data.error || "Failed to sign in");
			}

			toast.success("Signed in successfully!");
			router.push("/dashboard");
			router.refresh();
		} catch (error) {
			console.error("Error signing in:", error);
			throw error;
		}
	};

	const signOut = async () => {
		try {
			const response = await fetch("/api/auth/signout", {
				method: "POST",
			});

			const data = await response.json();

			if (!response.ok) {
				toast.error(data.error || "Failed to sign out");
				throw new Error(data.error || "Failed to sign out");
			}

			setUser(null);
			setUserRole(null);
			setHasVehicle(false);

			toast.success("Signed out successfully!");
			router.push("/");
			router.refresh();
		} catch (error) {
			console.error("Error signing out:", error);
			throw error;
		}
	};

	const value = {
		user,
		userRole,
		isLoading,
		hasVehicle,
		signIn,
		signOut,
	};

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
	const context = useContext(AuthContext);
	if (context === undefined) {
		throw new Error("useAuth must be used within an AuthProvider");
	}
	return context;
}
