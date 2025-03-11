"use client";
import { useState, useEffect } from "react";

export const ThemeToggler = () => {
	const [mounted, setMounted] = useState(false);
	const [theme, setTheme] = useState<"light" | "dark">("light");

	// Only run on client side
	useEffect(() => {
		setMounted(true);
		// Check for system preference or stored preference
		const storedTheme = localStorage.getItem("theme");
		const systemPreference = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";

		const initialTheme = storedTheme || systemPreference;
		setTheme(initialTheme as "light" | "dark");

		// No need to apply the class here as it's already done in the root layout
		console.log("Current theme on mount:", initialTheme);
		console.log("Dark class present:", document.documentElement.classList.contains("dark"));
	}, []);

	const toggleTheme = () => {
		const newTheme = theme === "light" ? "dark" : "light";
		setTheme(newTheme);
		localStorage.setItem("theme", newTheme);

		if (newTheme === "dark") {
			document.documentElement.classList.add("dark");
		} else {
			document.documentElement.classList.remove("dark");
		}

		console.log("Theme toggled to:", newTheme);
		console.log("Dark class present after toggle:", document.documentElement.classList.contains("dark"));
	};

	// Don't render anything until mounted to prevent hydration mismatch
	if (!mounted) return null;

	return (
		<button
			onClick={toggleTheme}
			className='fixed top-4 right-4 z-50 p-2 rounded-full dark:text-primary text-warning hover:opacity-80 cursor-pointer ease-in-out transition-all duration-300'
			aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}>
			{theme === "light" ? (
				<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='currentColor' className='w-6 h-6'>
					<path
						fillRule='evenodd'
						d='M9.528 1.718a.75.75 0 01.162.819A8.97 8.97 0 009 6a9 9 0 009 9 8.97 8.97 0 003.463-.69.75.75 0 01.981.98 10.503 10.503 0 01-9.694 6.46c-5.799 0-10.5-4.701-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 01.818.162z'
						clipRule='evenodd'
					/>
				</svg>
			) : (
				<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='currentColor' className='w-6 h-6'>
					<path d='M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.591-1.59zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.697 7.757a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 00-1.061 1.06l1.59 1.591z' />
				</svg>
			)}
		</button>
	);
};
