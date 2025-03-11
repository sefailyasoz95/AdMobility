"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ThemeToggler } from "../components/ThemeToggler";

export default function Register() {
  const [userType, setUserType] = useState<"vehicle-owner" | "advertiser">(
    "vehicle-owner"
  );
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    // Vehicle owner specific fields
    vehicleMake: "",
    vehicleModel: "",
    vehicleYear: "",
    dailyMileage: "",
    city: "",
    // Advertiser specific fields
    companyName: "",
    position: "",
    industry: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the data to your backend
    console.log("Form submitted:", formData);
    // For demo purposes, just show an alert
    alert(
      `Thank you for registering as a ${
        userType === "vehicle-owner" ? "Vehicle Owner" : "Advertiser"
      }!`
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/95 py-12">
      <ThemeToggler />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <Link href="/" className="inline-block mb-8">
            <h1 className="text-3xl font-bold">
              <span className="text-foreground">Ad</span>
              <span className="text-blue-500">Mobility</span>
            </h1>
          </Link>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Create Your Account
          </h2>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
            Join AdMobility today and start your journey with us
          </p>
        </div>

        <div className="max-w-3xl mx-auto bg-foreground/5 dark:bg-foreground/[0.03] rounded-xl p-6 md:p-8 shadow-sm">
          {/* User Type Selection */}
          <div className="mb-8">
            <div className="flex justify-center space-x-4 p-1 bg-foreground/10 dark:bg-foreground/[0.05] rounded-lg w-fit mx-auto">
              <button
                className={`px-6 py-2 rounded-md transition-colors ${
                  userType === "vehicle-owner"
                    ? "bg-blue-500 text-white"
                    : "hover:bg-foreground/5"
                }`}
                onClick={() => setUserType("vehicle-owner")}
              >
                Vehicle Owner
              </button>
              <button
                className={`px-6 py-2 rounded-md transition-colors ${
                  userType === "advertiser"
                    ? "bg-teal-500 text-white"
                    : "hover:bg-foreground/5"
                }`}
                onClick={() => setUserType("advertiser")}
              >
                Advertiser
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Common Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="firstName"
                  className="block text-sm font-medium mb-1"
                >
                  First Name
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 rounded-md border border-foreground/20 bg-background focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label
                  htmlFor="lastName"
                  className="block text-sm font-medium mb-1"
                >
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 rounded-md border border-foreground/20 bg-background focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-1">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 rounded-md border border-foreground/20 bg-background focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium mb-1"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 rounded-md border border-foreground/20 bg-background focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium mb-1"
                >
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 rounded-md border border-foreground/20 bg-background focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Vehicle Owner Specific Fields */}
            {userType === "vehicle-owner" && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <h3 className="text-xl font-semibold">Vehicle Information</h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label
                      htmlFor="vehicleMake"
                      className="block text-sm font-medium mb-1"
                    >
                      Vehicle Make
                    </label>
                    <input
                      type="text"
                      id="vehicleMake"
                      name="vehicleMake"
                      value={formData.vehicleMake}
                      onChange={handleChange}
                      className="w-full px-4 py-2 rounded-md border border-foreground/20 bg-background focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="vehicleModel"
                      className="block text-sm font-medium mb-1"
                    >
                      Vehicle Model
                    </label>
                    <input
                      type="text"
                      id="vehicleModel"
                      name="vehicleModel"
                      value={formData.vehicleModel}
                      onChange={handleChange}
                      className="w-full px-4 py-2 rounded-md border border-foreground/20 bg-background focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="vehicleYear"
                      className="block text-sm font-medium mb-1"
                    >
                      Year
                    </label>
                    <input
                      type="number"
                      id="vehicleYear"
                      name="vehicleYear"
                      value={formData.vehicleYear}
                      onChange={handleChange}
                      min="1900"
                      max={new Date().getFullYear()}
                      className="w-full px-4 py-2 rounded-md border border-foreground/20 bg-background focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="dailyMileage"
                      className="block text-sm font-medium mb-1"
                    >
                      Average Daily Mileage (km)
                    </label>
                    <input
                      type="number"
                      id="dailyMileage"
                      name="dailyMileage"
                      value={formData.dailyMileage}
                      onChange={handleChange}
                      min="0"
                      className="w-full px-4 py-2 rounded-md border border-foreground/20 bg-background focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="city"
                      className="block text-sm font-medium mb-1"
                    >
                      City
                    </label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      className="w-full px-4 py-2 rounded-md border border-foreground/20 bg-background focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {/* Advertiser Specific Fields */}
            {userType === "advertiser" && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <h3 className="text-xl font-semibold">Company Information</h3>

                <div>
                  <label
                    htmlFor="companyName"
                    className="block text-sm font-medium mb-1"
                  >
                    Company Name
                  </label>
                  <input
                    type="text"
                    id="companyName"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-md border border-foreground/20 bg-background focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="position"
                      className="block text-sm font-medium mb-1"
                    >
                      Your Position
                    </label>
                    <input
                      type="text"
                      id="position"
                      name="position"
                      value={formData.position}
                      onChange={handleChange}
                      className="w-full px-4 py-2 rounded-md border border-foreground/20 bg-background focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="industry"
                      className="block text-sm font-medium mb-1"
                    >
                      Industry
                    </label>
                    <input
                      type="text"
                      id="industry"
                      name="industry"
                      value={formData.industry}
                      onChange={handleChange}
                      className="w-full px-4 py-2 rounded-md border border-foreground/20 bg-background focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </motion.div>
            )}

            <div className="flex items-center">
              <input
                type="checkbox"
                id="terms"
                name="terms"
                required
                className="h-4 w-4 text-blue-500 focus:ring-blue-500 border-foreground/20 rounded"
              />
              <label htmlFor="terms" className="ml-2 block text-sm">
                I agree to the{" "}
                <Link href="/terms" className="text-blue-500 hover:underline">
                  Terms and Conditions
                </Link>{" "}
                and{" "}
                <Link href="/privacy" className="text-blue-500 hover:underline">
                  Privacy Policy
                </Link>
              </label>
            </div>

            <div>
              <button
                type="submit"
                className={`w-full py-3 px-4 rounded-md text-white font-medium transition-colors ${
                  userType === "vehicle-owner"
                    ? "bg-blue-600 hover:bg-blue-700"
                    : "bg-teal-600 hover:bg-teal-700"
                }`}
              >
                Create Account
              </button>
            </div>

            <div className="text-center text-sm">
              Already have an account?{" "}
              <Link href="/login" className="text-blue-500 hover:underline">
                Log in
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
