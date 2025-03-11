"use client";
import { useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import AdvertiserDashboard from "./components/AdvertiserDashboard";
import VehicleOwnerDashboard from "./components/VehicleOwnerDashboard";

export default function Dashboard() {
	const { user, userRole, isLoading } = useAuth();
	const router = useRouter();

	// If the user is not authenticated, redirect to login
	useEffect(() => {
		if (!isLoading && !user) {
			router.push("/login");
		}
	}, [user, isLoading, router]);

	// Show loading state while checking authentication
	if (isLoading) {
		return (
			<div className='min-h-screen flex items-center justify-center'>
				<div className='text-center'>
					<Loader2 className='h-12 w-12 animate-spin mx-auto text-blue-500' />
					<p className='mt-4 text-lg text-foreground/70'>Loading your dashboard...</p>
				</div>
			</div>
		);
	}

	// If user is not authenticated and we're not loading, the useEffect will handle the redirect
	if (!user) {
		return null;
	}

	return (
		<>
			{userRole === "advertiser" ? (
				<AdvertiserDashboard user={user} />
			) : userRole === "vehicle_owner" ? (
				<VehicleOwnerDashboard user={user} />
			) : (
				<div className='text-center py-12'>
					<p className='text-lg text-foreground/70'>Unknown user role. Please contact support.</p>
				</div>
			)}
		</>
	);
}
