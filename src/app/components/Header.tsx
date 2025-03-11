"use client";

import { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { Bell, ChevronDown, Menu, Settings, User, LogOut } from "lucide-react";
import { ThemeToggler } from "./ThemeToggler";

export default function Header() {
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
	const [profileOpen, setProfileOpen] = useState(false);
	const { user, signOut } = useAuth();

	const toggleMobileMenu = () => {
		setMobileMenuOpen(!mobileMenuOpen);
	};

	const toggleProfile = () => {
		setProfileOpen(!profileOpen);
	};

	return (
		<header className='bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800'>
			<div className='container mx-auto px-4 py-3 flex items-center justify-between'>
				{/* Mobile menu button */}
				<button
					className='md:hidden p-2 rounded-md text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
					onClick={toggleMobileMenu}>
					<Menu className='h-6 w-6' />
				</button>

				{/* Logo */}
				<Link href='/dashboard' className='text-xl font-bold text-blue-600 dark:text-blue-400'>
					AdMobility
				</Link>

				{/* Right side items */}
				<div className='flex items-center space-x-4'>
					{/* Theme toggle */}
					<div className='hidden md:block'>
						<ThemeToggler />
					</div>

					{/* Notifications */}
					<button className='p-2 rounded-full text-gray-500 hover:text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-gray-200 dark:hover:bg-gray-800'>
						<Bell className='h-5 w-5' />
					</button>

					{/* Profile dropdown */}
					<div className='relative'>
						<button
							className='flex items-center space-x-2 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800'
							onClick={toggleProfile}>
							<div className='w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-teal-400 flex items-center justify-center text-white font-medium'>
								{user?.full_name?.charAt(0) || "U"}
							</div>
							<span className='hidden md:inline text-sm font-medium text-gray-700 dark:text-gray-300'>
								{user?.full_name || "User"}
							</span>
							<ChevronDown className='h-4 w-4 text-gray-500 dark:text-gray-400' />
						</button>

						{/* Dropdown menu */}
						{profileOpen && (
							<div className='absolute right-0 mt-2 w-48 bg-white dark:bg-gray-900 rounded-md shadow-lg border border-gray-200 dark:border-gray-700 z-10'>
								<div className='py-1'>
									<Link
										href='/dashboard/profile'
										className='flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
										onClick={() => setProfileOpen(false)}>
										<User className='h-4 w-4 mr-2' />
										Profile
									</Link>
									<Link
										href='/dashboard/settings'
										className='flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
										onClick={() => setProfileOpen(false)}>
										<Settings className='h-4 w-4 mr-2' />
										Settings
									</Link>
									<button
										className='w-full text-left flex items-center px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-800'
										onClick={() => {
											signOut();
											setProfileOpen(false);
										}}>
										<LogOut className='h-4 w-4 mr-2' />
										Sign out
									</button>
								</div>
							</div>
						)}
					</div>
				</div>
			</div>
		</header>
	);
}
