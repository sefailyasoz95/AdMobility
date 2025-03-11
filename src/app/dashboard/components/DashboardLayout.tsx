"use client";
import { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { usePathname } from "next/navigation";
import { ThemeToggler } from "@/app/components/ThemeToggler";
import {
	Home,
	Car,
	FileText,
	Bell,
	Settings,
	LogOut,
	Menu,
	X,
	LayoutDashboard,
	MessageSquare,
	CreditCard,
	BarChart3,
} from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { toast } from "sonner";

interface DashboardLayoutProps {
	children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
	const { user, userRole, signOut } = useAuth();
	const pathname = usePathname();
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);

	const handleSignOut = async () => {
		try {
			await signOut();
			toast.success("Signed out successfully");
		} catch (error) {
			console.error("Error signing out:", error);
		}
	};

	// Define navigation items based on user role
	const navigationItems =
		userRole === "advertiser"
			? [
					{ name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
					{ name: "Campaigns", href: "/dashboard/campaigns", icon: BarChart3 },
					{ name: "Find Vehicles", href: "/dashboard/vehicles", icon: Car },
					{ name: "Messages", href: "/dashboard/messages", icon: MessageSquare },
					{ name: "Payments", href: "/dashboard/payments", icon: CreditCard },
					{ name: "Settings", href: "/dashboard/settings", icon: Settings },
			  ]
			: [
					{ name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
					{ name: "My Vehicle", href: "/dashboard/vehicle", icon: Car },
					{ name: "Offers", href: "/dashboard/offers", icon: FileText },
					{ name: "Messages", href: "/dashboard/messages", icon: MessageSquare },
					{ name: "Earnings", href: "/dashboard/earnings", icon: CreditCard },
					{ name: "Settings", href: "/dashboard/settings", icon: Settings },
			  ];

	return (
		<div className='min-h-screen bg-background'>
			{/* Mobile sidebar toggle */}
			<div className='lg:hidden fixed top-4 left-4 z-50'>
				<Button variant='outline' size='icon' onClick={() => setIsSidebarOpen(!isSidebarOpen)} className='rounded-full'>
					{isSidebarOpen ? <X className='h-5 w-5' /> : <Menu className='h-5 w-5' />}
				</Button>
			</div>

			{/* Theme toggler in top right */}
			<div className='fixed top-4 right-4 z-50'>
				<ThemeToggler />
			</div>

			{/* Sidebar - Mobile (overlay) */}
			<div
				className={`fixed inset-0 bg-background/80 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-200 ${
					isSidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
				}`}
				onClick={() => setIsSidebarOpen(false)}
			/>

			{/* Sidebar content */}
			<aside
				className={`fixed top-0 left-0 z-40 h-full w-64 bg-card border-r border-border transition-transform duration-300 ease-in-out ${
					isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
				}`}>
				<div className='flex flex-col h-full'>
					{/* Logo */}
					<div className='p-4 border-b border-border'>
						<Link href='/' className='flex items-center'>
							<h1 className='text-xl font-bold'>
								<span className='text-foreground'>Ad</span>
								<span className='text-blue-500'>Mobility</span>
							</h1>
						</Link>
					</div>

					{/* User info */}
					<div className='p-4 border-b border-border'>
						<div className='flex items-center space-x-3'>
							<div className='w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium'>
								{user?.full_name?.charAt(0) || "U"}
							</div>
							<div className='flex-1 min-w-0'>
								<p className='text-sm font-medium truncate'>{user?.full_name}</p>
								<p className='text-xs text-muted-foreground truncate'>{user?.email}</p>
							</div>
						</div>
					</div>

					{/* Navigation */}
					<nav className='flex-1 p-4 space-y-1 overflow-y-auto'>
						{navigationItems.map((item) => {
							const isActive = pathname === item.href;
							const Icon = item.icon;

							return (
								<Link
									key={item.name}
									href={item.href}
									className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
										isActive ? "bg-primary text-primary-foreground" : "hover:bg-muted"
									}`}
									onClick={() => setIsSidebarOpen(false)}>
									<Icon className='mr-3 h-5 w-5' />
									{item.name}
								</Link>
							);
						})}
					</nav>

					{/* Sign out button */}
					<div className='p-4 border-t border-border'>
						<Button
							variant='ghost'
							className='w-full justify-start text-muted-foreground hover:text-foreground'
							onClick={handleSignOut}>
							<LogOut className='mr-3 h-5 w-5' />
							Sign Out
						</Button>
					</div>
				</div>
			</aside>

			{/* Main content */}
			<main className='lg:pl-64 min-h-screen'>
				<div className='p-4 sm:p-6 lg:p-8 pt-16 lg:pt-8'>{children}</div>
			</main>
		</div>
	);
}
