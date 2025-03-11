"use client";
import { useState, useEffect } from "react";
import { User, Vehicle } from "@/lib/types";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/components/ui/tabs";
import { Car, FileText, CreditCard, Camera, TrendingUp, AlertCircle } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

interface VehicleOwnerDashboardProps {
	user: User;
}

export default function VehicleOwnerDashboard({ user }: VehicleOwnerDashboardProps) {
	const [vehicles, setVehicles] = useState<Vehicle[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [stats, setStats] = useState({
		activeOffers: 0,
		pendingOffers: 0,
		totalEarnings: 0,
		missedUploads: 0,
	});

	useEffect(() => {
		const fetchVehicleData = async () => {
			try {
				setIsLoading(true);

				// Fetch vehicles through API
				const response = await fetch(`/api/vehicles?ownerId=${user.id}`);

				if (!response.ok) {
					console.error("Error fetching vehicles:", await response.text());
					return;
				}

				const data = await response.json();
				setVehicles(data.vehicles as Vehicle[]);

				// Fetch stats (in a real app, these would be actual queries)
				// For now, we'll use dummy data
				setStats({
					activeOffers: 1,
					pendingOffers: 2,
					totalEarnings: 750,
					missedUploads: 1,
				});
			} catch (error) {
				console.error("Error in fetching data:", error);
			} finally {
				setIsLoading(false);
			}
		};

		fetchVehicleData();
	}, [user.id]);

	if (isLoading) {
		return (
			<div className='flex items-center justify-center h-64'>
				<div className='animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500'></div>
			</div>
		);
	}

	return (
		<div className='space-y-8'>
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5 }}
				className='relative overflow-hidden rounded-xl bg-gradient-to-r from-blue-600/10 to-teal-500/10 p-8'>
				<div className='absolute -top-6 -right-6 h-24 w-24 bg-blue-500/10 rounded-full blur-2xl'></div>
				<div className='absolute -bottom-6 -left-6 h-24 w-24 bg-teal-500/10 rounded-full blur-2xl'></div>

				<h1 className='text-3xl font-bold tracking-tight'>Welcome, {user.full_name}</h1>
				<p className='text-muted-foreground mt-2'>Here's an overview of your vehicles and advertising activities.</p>
			</motion.div>

			{/* Stats Cards */}
			<div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
				{[
					{
						title: "Active Offers",
						value: stats.activeOffers,
						description: "Currently running on your vehicle",
						icon: <Car className='h-5 w-5 text-blue-500' />,
						delay: 0.1,
					},
					{
						title: "Pending Offers",
						value: stats.pendingOffers,
						description: "Waiting for your response",
						icon: <FileText className='h-5 w-5 text-teal-500' />,
						delay: 0.2,
					},
					{
						title: "Total Earnings",
						value: `$${stats.totalEarnings}`,
						description: "Lifetime earnings",
						icon: <CreditCard className='h-5 w-5 text-blue-500' />,
						delay: 0.3,
					},
					{
						title: "Missed Uploads",
						value: stats.missedUploads,
						description:
							stats.missedUploads > 0 ? "Action required! Upload your daily photo" : "No missed uploads. Great job!",
						icon: <Camera className='h-5 w-5 text-teal-500' />,
						warning: stats.missedUploads > 0,
						delay: 0.4,
					},
				].map((stat, index) => (
					<motion.div
						key={index}
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5, delay: stat.delay }}>
						<Card
							className={`border border-foreground/10 hover:border-foreground/20 hover:shadow-md transition-all duration-300 ${
								stat.warning ? "border-red-500" : ""
							}`}>
							<CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
								<CardTitle className='text-sm font-medium'>{stat.title}</CardTitle>
								{stat.icon}
							</CardHeader>
							<CardContent>
								<div className={`text-2xl font-bold ${stat.warning ? "text-red-500" : ""}`}>{stat.value}</div>
								<p className='text-xs text-muted-foreground'>{stat.description}</p>
							</CardContent>
						</Card>
					</motion.div>
				))}
			</div>

			{/* Vehicle Status */}
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5, delay: 0.5 }}>
				<Card className='border border-foreground/10 hover:border-foreground/20 hover:shadow-md transition-all duration-300'>
					<CardHeader className='bg-gradient-to-r from-blue-600/5 to-teal-500/5'>
						<CardTitle>Your Vehicles</CardTitle>
						<CardDescription>Manage your registered vehicles and their advertising status</CardDescription>
					</CardHeader>
					<CardContent className='p-6'>
						{vehicles.length === 0 ? (
							<motion.div
								initial={{ opacity: 0, scale: 0.95 }}
								animate={{ opacity: 1, scale: 1 }}
								transition={{ duration: 0.5 }}
								className='text-center py-6'>
								<Car className='h-12 w-12 mx-auto text-blue-500/50' />
								<h3 className='mt-4 text-lg font-medium'>No vehicles registered yet</h3>
								<p className='mt-2 text-sm text-muted-foreground'>
									Register your vehicle to start receiving advertising offers
								</p>
								<Button className='mt-4 bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600'>
									<Link href='/dashboard/vehicle/new'>Register a Vehicle</Link>
								</Button>
							</motion.div>
						) : (
							<div className='space-y-4'>
								{vehicles.map((vehicle, index) => (
									<motion.div
										key={vehicle.id}
										initial={{ opacity: 0, y: 10 }}
										animate={{ opacity: 1, y: 0 }}
										transition={{ duration: 0.3, delay: 0.6 + index * 0.1 }}
										className='flex flex-col md:flex-row items-start md:items-center justify-between p-4 border rounded-lg hover:shadow-sm transition-all duration-300 bg-foreground/[0.01]'>
										<div className='flex items-center'>
											<div className='mr-4 rounded-full bg-blue-500/10 p-2'>
												<Car className='h-5 w-5 text-blue-500' />
											</div>
											<div>
												<h3 className='font-medium'>
													{vehicle.make} {vehicle.model} ({vehicle.year})
												</h3>
												<p className='text-sm text-muted-foreground'>
													Plate: {vehicle.plate_number} • Status: {vehicle.status.replace(/_/g, " ")}
												</p>
											</div>
										</div>
										<div className='mt-4 md:mt-0 w-full md:w-auto flex space-x-2'>
											<Button variant='outline' size='sm'>
												<Link href={`/dashboard/vehicle/${vehicle.id}`}>View Details</Link>
											</Button>
											{vehicle.status === "ad_active" && (
												<Button size='sm' className='bg-blue-500 hover:bg-blue-600'>
													<Link href={`/dashboard/vehicle/${vehicle.id}/upload`}>Upload Photo</Link>
												</Button>
											)}
										</div>
									</motion.div>
								))}
							</div>
						)}
					</CardContent>
				</Card>
			</motion.div>

			{/* Quick Actions */}
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5, delay: 0.8 }}>
				<h2 className='text-xl font-semibold mb-4'>Quick Actions</h2>
				<div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
					{[
						{
							title: "Upload Daily Photo",
							description: "Submit your daily photo to verify ad placement",
							icon: <Camera className='mr-2 h-4 w-4' />,
							href: "/dashboard/upload",
							primary: true,
							delay: 0.9,
						},
						{
							title: "View Offers",
							description: "Check and respond to advertising offers",
							icon: <FileText className='mr-2 h-4 w-4' />,
							href: "/dashboard/offers",
							primary: false,
							delay: 1.0,
						},
						{
							title: "Earnings Report",
							description: "View your earnings and payment history",
							icon: <TrendingUp className='mr-2 h-4 w-4' />,
							href: "/dashboard/earnings",
							primary: false,
							delay: 1.1,
						},
					].map((action, index) => (
						<motion.div
							key={index}
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5, delay: action.delay }}>
							<Card className='border border-foreground/10 hover:border-foreground/20 hover:shadow-md transition-all duration-300 h-full'>
								<CardHeader>
									<CardTitle>{action.title}</CardTitle>
									<CardDescription>{action.description}</CardDescription>
								</CardHeader>
								<CardContent>
									<Link href={action.href}>
										<Button className='w-full' variant={action.primary ? "default" : "outline"}>
											{action.icon}
											{action.title}
										</Button>
									</Link>
								</CardContent>
							</Card>
						</motion.div>
					))}
				</div>
			</motion.div>

			{/* Alerts */}
			{stats.missedUploads > 0 && (
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5, delay: 1.2 }}>
					<Card className='border-red-500 bg-gradient-to-r from-red-500/5 to-red-500/10 overflow-hidden'>
						<CardHeader>
							<div className='flex items-center'>
								<AlertCircle className='h-5 w-5 text-red-500 mr-2' />
								<CardTitle className='text-red-500'>Action Required</CardTitle>
							</div>
						</CardHeader>
						<CardContent className='p-6'>
							<p className='text-sm'>
								You have missed {stats.missedUploads} daily photo upload{stats.missedUploads > 1 ? "s" : ""}. This could
								affect your payment. Please upload your verification photo as soon as possible.
							</p>
							<Button className='mt-4 bg-red-500 hover:bg-red-600'>
								<Link href='/dashboard/upload'>Upload Now</Link>
							</Button>
						</CardContent>
					</Card>
				</motion.div>
			)}

			{/* Earnings Potential */}
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5, delay: 1.3 }}
				className='relative overflow-hidden rounded-xl bg-gradient-to-r from-blue-600 to-teal-500 p-8 text-white'>
				<div className='absolute inset-0 bg-black/10'></div>
				<div className='relative z-10'>
					<h2 className='text-2xl font-bold mb-4'>Maximize Your Earnings</h2>
					<p className='mb-6'>Register additional vehicles or refer friends to earn more with AdMobility.</p>
					<div className='flex flex-col sm:flex-row gap-4'>
						<Link href='/dashboard/vehicle/new'>
							<Button className='bg-white text-blue-600 hover:bg-white/90'>Register Another Vehicle</Button>
						</Link>
						<Link href='/dashboard/referrals'>
							<Button className='bg-transparent border border-white hover:bg-white/10'>Refer a Friend</Button>
						</Link>
					</div>
				</div>
			</motion.div>
		</div>
	);
}
