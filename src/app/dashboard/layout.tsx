"use client";

import { useAuth } from "@/contexts/AuthContext";
import { AlertCircle } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

// Import Header and Sidebar components from the correct path
import Header from "@/app/components/Header";
import Sidebar from "@/app/components/Sidebar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
	const { user, userRole, isLoading, hasVehicle } = useAuth();
	const pathname = usePathname();

	return (
		<div className='flex min-h-screen flex-col'>
			<Header />
			<div className='flex flex-1'>
				<Sidebar />
				<main className='flex-1 p-6 md:p-8'>
					{/* Vehicle Registration Alert */}
					{!isLoading && user && userRole === "vehicle_owner" && !hasVehicle && (
						<div className='mb-6 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 flex items-start'>
							<AlertCircle className='h-5 w-5 text-yellow-500 mt-0.5 mr-3 flex-shrink-0' />
							<div>
								<h3 className='font-medium text-yellow-800 dark:text-yellow-300'>Vehicle Registration Required</h3>
								<p className='text-sm text-yellow-700 dark:text-yellow-400 mt-1'>
									You need to register your vehicle to access all features.
									{pathname !== "/dashboard/vehicle/new" && (
										<Link href='/dashboard/vehicle/new' className='ml-2 font-medium underline'>
											Register now
										</Link>
									)}
								</p>
							</div>
						</div>
					)}

					{children}
				</main>
			</div>
		</div>
	);
}
