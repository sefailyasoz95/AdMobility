"use client";
import { useState, useEffect } from "react";
import { User, Advertiser } from "@/lib/types";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/components/ui/tabs";
import { BarChart3, Car, FileText, CreditCard, TrendingUp, Users } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

interface AdvertiserDashboardProps {
	user: User;
}

export default function AdvertiserDashboard({ user }: AdvertiserDashboardProps) {
	const [advertiserProfile, setAdvertiserProfile] = useState<Advertiser | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const [stats, setStats] = useState({
		activeCampaigns: 0,
		pendingOffers: 0,
		totalVehicles: 0,
		totalSpent: 0,
	});

	useEffect(() => {
		const fetchAdvertiserProfile = async () => {
			try {
				setIsLoading(true);

				// Fetch advertiser profile through API
				const response = await fetch(`/api/advertisers/${user.id}`);

				if (!response.ok) {
					console.error("Error fetching advertiser profile:", await response.text());
					return;
				}

				const data = await response.json();
				setAdvertiserProfile(data.advertiser as Advertiser);

				// Fetch stats (in a real app, these would be actual queries)
				// For now, we'll use dummy data
				setStats({
					activeCampaigns: 2,
					pendingOffers: 3,
					totalVehicles: 5,
					totalSpent: 1250,
				});
			} catch (error) {
				console.error("Error in fetching data:", error);
			} finally {
				setIsLoading(false);
			}
		};

		fetchAdvertiserProfile();
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
				<p className='text-muted-foreground mt-2'>Here's an overview of your advertising campaigns and activities.</p>
			</motion.div>

			{/* Stats Cards */}
			<div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
				{[
					{
						title: "Active Campaigns",
						value: stats.activeCampaigns,
						description: stats.activeCampaigns > 0 ? "+1 from last month" : "No active campaigns",
						icon: <BarChart3 className='h-5 w-5 text-blue-500' />,
						delay: 0.1,
					},
					{
						title: "Pending Offers",
						value: stats.pendingOffers,
						description: "Awaiting vehicle owner response",
						icon: <FileText className='h-5 w-5 text-teal-500' />,
						delay: 0.2,
					},
					{
						title: "Total Vehicles",
						value: stats.totalVehicles,
						description: "Currently displaying your ads",
						icon: <Car className='h-5 w-5 text-blue-500' />,
						delay: 0.3,
					},
					{
						title: "Total Spent",
						value: `$${stats.totalSpent}`,
						description: "Lifetime ad spend",
						icon: <CreditCard className='h-5 w-5 text-teal-500' />,
						delay: 0.4,
					},
				].map((stat, index) => (
					<motion.div
						key={index}
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5, delay: stat.delay }}>
						<Card className='border border-foreground/10 hover:border-foreground/20 hover:shadow-md transition-all duration-300'>
							<CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
								<CardTitle className='text-sm font-medium'>{stat.title}</CardTitle>
								{stat.icon}
							</CardHeader>
							<CardContent>
								<div className='text-2xl font-bold'>{stat.value}</div>
								<p className='text-xs text-muted-foreground'>{stat.description}</p>
							</CardContent>
						</Card>
					</motion.div>
				))}
			</div>

			{/* Quick Actions */}
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5, delay: 0.5 }}>
				<h2 className='text-xl font-semibold mb-4'>Quick Actions</h2>
				<div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
					{[
						{
							title: "Create New Campaign",
							description: "Start a new advertising campaign and reach more customers",
							icon: <BarChart3 className='mr-2 h-4 w-4' />,
							href: "/dashboard/campaigns/new",
							primary: true,
							delay: 0.6,
						},
						{
							title: "Find Vehicles",
							description: "Browse available vehicles that match your target audience",
							icon: <Car className='mr-2 h-4 w-4' />,
							href: "/dashboard/vehicles",
							primary: false,
							delay: 0.7,
						},
						{
							title: "View Analytics",
							description: "Check the performance of your current campaigns",
							icon: <TrendingUp className='mr-2 h-4 w-4' />,
							href: "/dashboard/analytics",
							primary: false,
							delay: 0.8,
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

			{/* Recent Activity */}
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5, delay: 0.9 }}>
				<Card className='border border-foreground/10 overflow-hidden'>
					<CardHeader className='bg-gradient-to-r from-blue-600/5 to-teal-500/5'>
						<CardTitle>Recent Activity</CardTitle>
						<CardDescription>Your latest advertising activities and updates</CardDescription>
					</CardHeader>
					<CardContent className='p-6'>
						<div className='space-y-6'>
							{[
								{
									icon: <Users className='h-4 w-4 text-blue-500' />,
									title: "New offer accepted",
									description: "Vehicle owner John D. accepted your offer for a 3-month campaign",
									time: "2 days ago",
									delay: 1.0,
								},
								{
									icon: <CreditCard className='h-4 w-4 text-teal-500' />,
									title: "Payment processed",
									description: '$450 payment for "Summer Promotion" campaign processed',
									time: "5 days ago",
									delay: 1.1,
								},
								{
									icon: <BarChart3 className='h-4 w-4 text-blue-500' />,
									title: "Campaign completed",
									description: '"Spring Sale" campaign has ended with 15,000+ impressions',
									time: "2 weeks ago",
									delay: 1.2,
								},
							].map((activity, index) => (
								<motion.div
									key={index}
									initial={{ opacity: 0, x: -20 }}
									animate={{ opacity: 1, x: 0 }}
									transition={{ duration: 0.5, delay: activity.delay }}
									className='flex items-center'>
									<div className='mr-4 rounded-full bg-primary/10 p-2'>{activity.icon}</div>
									<div>
										<p className='text-sm font-medium'>{activity.title}</p>
										<p className='text-xs text-muted-foreground'>{activity.description}</p>
									</div>
									<div className='ml-auto text-xs text-muted-foreground'>{activity.time}</div>
								</motion.div>
							))}
						</div>
					</CardContent>
				</Card>
			</motion.div>

			{/* Campaign Performance */}
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5, delay: 1.3 }}
				className='relative overflow-hidden rounded-xl bg-gradient-to-r from-blue-600 to-teal-500 p-8 text-white'>
				<div className='absolute inset-0 bg-black/10'></div>
				<div className='relative z-10'>
					<h2 className='text-2xl font-bold mb-4'>Ready to Expand Your Reach?</h2>
					<p className='mb-6'>Increase your brand visibility by adding more vehicles to your campaign.</p>
					<Link href='/dashboard/campaigns/new'>
						<Button className='bg-white text-blue-600 hover:bg-white/90'>Create New Campaign</Button>
					</Link>
				</div>
			</motion.div>
		</div>
	);
}
