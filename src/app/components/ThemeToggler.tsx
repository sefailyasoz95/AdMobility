"use client";
import { useState, useEffect } from "react";

export const ThemeToggler = () => {
	const [mounted, setMounted] = useState(false);
	const [theme, setTheme] = useState<"light" | "dark" | "system">("system");

	// Apply theme based on current settings
	const applyTheme = (newTheme: "light" | "dark" | "system") => {
		// If system preference, remove from localStorage and check media query
		if (newTheme === "system") {
			localStorage.removeItem("theme");
			const systemIsDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
			document.documentElement.classList.toggle("dark", systemIsDark);
			return;
		}

		// Otherwise set explicit theme
		localStorage.theme = newTheme;
		document.documentElement.classList.toggle("dark", newTheme === "dark");
	};

	// Only run on client side
	useEffect(() => {
		setMounted(true);

		// Determine initial theme
		const storedTheme = localStorage.getItem("theme");
		const initialTheme = storedTheme ? (storedTheme as "light" | "dark") : "system";
		setTheme(initialTheme);

		// Apply the theme on initial load
		applyTheme(initialTheme);

		// Set up listener for system preference changes
		const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
		const handleSystemThemeChange = (e: MediaQueryListEvent) => {
			if (theme === "system") {
				document.documentElement.classList.toggle("dark", e.matches);
			}
		};

		mediaQuery.addEventListener("change", handleSystemThemeChange);
		return () => mediaQuery.removeEventListener("change", handleSystemThemeChange);
	}, [theme]);

	const toggleTheme = () => {
		// Cycle through themes: light -> dark -> system -> light
		const newTheme = theme === "light" ? "dark" : theme === "dark" ? "light" : "dark";
		setTheme(newTheme);
		applyTheme(newTheme);
	};

	// Don't render anything until mounted to prevent hydration mismatch
	if (!mounted) return null;

	return (
		<button
			onClick={toggleTheme}
			className='fixed top-4 right-4 z-50 p-2 rounded-full dark:text-yellow-500 text-blue-300  hover:opacity-80 cursor-pointer ease-in-out transition-all duration-300'
			aria-label={`Current theme: ${theme}. Click to change.`}>
			{theme === "light" ? (
				<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='currentColor' className='w-6 h-6'>
					<path
						fillRule='evenodd'
						d='M9.528 1.718a.75.75 0 01.162.819A8.97 8.97 0 009 6a9 9 0 009 9 8.97 8.97 0 003.463-.69.75.75 0 01.981.98 10.503 10.503 0 01-9.694 6.46c-5.799 0-10.5-4.701-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 01.818.162z'
						clipRule='evenodd'
					/>
				</svg>
			) : theme === "dark" ? (
				<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='currentColor' className='w-6 h-6'>
					<path d='M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.591-1.59zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.697 7.757a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 00-1.061 1.06l1.59 1.591z' />
				</svg>
			) : (
				<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='currentColor' className='w-6 h-6'>
					<path
						fillRule='evenodd'
						d='M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 01.67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 11-.671-1.34l.041-.022zM12 9a.75.75 0 100-1.5.75.75 0 000 1.5z'
						clipRule='evenodd'
					/>
				</svg>
			)}
		</button>
	);
};
