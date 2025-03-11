"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";

export default function VehicleInfoRedirect() {
	const router = useRouter();
	const { user, isLoading } = useAuth();

	useEffect(() => {
		if (!isLoading) {
			if (!user) {
				// If not logged in, redirect to login
				router.push("/login");
			} else {
				// Redirect to the vehicle registration page
				router.push("/dashboard/vehicle/new");
			}
		}
	}, [user, isLoading, router]);

	return (
		<div className='min-h-screen flex items-center justify-center'>
			<div className='text-center'>
				<div className='animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4'></div>
				<h1 className='text-2xl font-semibold mb-2'>Redirecting...</h1>
				<p className='text-muted-foreground'>Taking you to the vehicle registration page</p>
			</div>
		</div>
	);
}
