"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { LayoutDashboard, Car, FileText, CreditCard, BarChart3, Users, Settings, ChevronDown } from "lucide-react";

export default function Sidebar() {
	const pathname = usePathname();
	const { userRole } = useAuth();
	const [isMobile, setIsMobile] = useState(false);
	const [isOpen, setIsOpen] = useState(false);

	// Check if mobile on mount and when window resizes
	useEffect(() => {
		const checkIfMobile = () => {
			setIsMobile(window.innerWidth < 768);
		};

		checkIfMobile();
		window.addEventListener("resize", checkIfMobile);

		return () => {
			window.removeEventListener("resize", checkIfMobile);
		};
	}, []);

	// Close sidebar on mobile when navigating
	useEffect(() => {
		if (isMobile) {
			setIsOpen(false);
		}
	}, [pathname, isMobile]);

	const vehicleOwnerLinks = [
		{ name: "Dashboard", href: "/dashboard", icon: <LayoutDashboard size={20} /> },
		{ name: "My Vehicles", href: "/dashboard/vehicles", icon: <Car size={20} /> },
		{ name: "Ad Offers", href: "/dashboard/offers", icon: <FileText size={20} /> },
		{ name: "Earnings", href: "/dashboard/earnings", icon: <CreditCard size={20} /> },
	];

	const advertiserLinks = [
		{ name: "Dashboard", href: "/dashboard", icon: <LayoutDashboard size={20} /> },
		{ name: "Campaigns", href: "/dashboard/campaigns", icon: <BarChart3 size={20} /> },
		{ name: "Find Vehicles", href: "/dashboard/vehicles", icon: <Car size={20} /> },
		{ name: "Payments", href: "/dashboard/payments", icon: <CreditCard size={20} /> },
	];

	const links = userRole === "vehicle_owner" ? vehicleOwnerLinks : advertiserLinks;

	const isLinkActive = (href: string) => {
		if (href === "/dashboard") {
			return pathname === "/dashboard";
		}
		return pathname?.startsWith(href);
	};

	return (
		<>
			{/* Mobile overlay */}
			{isMobile && isOpen && <div className='fixed inset-0 bg-black/50 z-40' onClick={() => setIsOpen(false)} />}

			{/* Sidebar */}
			<aside
				className={`
          fixed md:sticky top-0 z-50 md:z-0 h-screen w-64 border-r bg-background transition-transform duration-300 ease-in-out
          ${isMobile ? (isOpen ? "translate-x-0" : "-translate-x-full") : "translate-x-0"}
        `}>
				<div className='flex flex-col h-full py-6'>
					<div className='px-4 mb-6 md:hidden'>
						<Link href='/dashboard' className='flex items-center gap-2'>
							<span className='text-xl font-bold'>
								<span className='text-foreground'>Ad</span>
								<span className='text-blue-500'>Mobility</span>
							</span>
						</Link>
					</div>

					<div className='px-3 mb-2'>
						<h3 className='text-xs font-semibold text-muted-foreground tracking-wider uppercase'>Main</h3>
					</div>

					<nav className='space-y-1 px-2 flex-1'>
						{links.map((link) => (
							<Link
								key={link.href}
								href={link.href}
								className={`
                  flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors
                  ${
										isLinkActive(link.href)
											? "bg-blue-500/10 text-blue-600 dark:text-blue-400"
											: "text-muted-foreground hover:bg-accent"
									}
                `}>
								{link.icon}
								{link.name}
							</Link>
						))}
					</nav>

					<div className='px-3 mt-6 mb-2'>
						<h3 className='text-xs font-semibold text-muted-foreground tracking-wider uppercase'>Settings</h3>
					</div>

					<div className='space-y-1 px-2'>
						<Link
							href='/dashboard/settings'
							className={`
                flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors
                ${
									isLinkActive("/dashboard/settings")
										? "bg-blue-500/10 text-blue-600 dark:text-blue-400"
										: "text-muted-foreground hover:bg-accent"
								}
              `}>
							<Settings size={20} />
							Settings
						</Link>
					</div>

					{/* Mobile toggle button */}
					{isMobile && (
						<button
							className='fixed bottom-4 left-4 p-3 bg-blue-500 text-white rounded-full shadow-lg'
							onClick={() => setIsOpen(!isOpen)}>
							<ChevronDown
								size={24}
								className={`transform transition-transform ${isOpen ? "rotate-180" : "rotate-0"}`}
							/>
						</button>
					)}
				</div>
			</aside>
		</>
	);
}
