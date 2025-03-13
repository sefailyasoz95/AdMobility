"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ThemeToggler } from "../components/ThemeToggler";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

// Import shadcn components
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Checkbox } from "../components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../components/ui/form";
import { Loader2 } from "lucide-react";

// Import types from the centralized types file
import type {
  UserRole,
  VehicleOwnerRegistrationForm,
  AdvertiserRegistrationForm,
  VehicleOwnerFormValues,
  AdvertiserFormValues,
} from "@/lib/types";

// Define validation schemas
const vehicleOwnerFormSchema = z
  .object({
    full_name: z
      .string()
      .min(2, { message: "Name must be at least 2 characters" }),
    email: z.string().email({ message: "Please enter a valid email address" }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" }),
    confirm_password: z.string(),
    phone_number: z.string().optional(),
    terms: z.boolean().refine((val) => val === true, {
      message: "You must accept the terms and conditions",
    }),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Passwords do not match",
    path: ["confirm_password"],
  });

const advertiserFormSchema = z
  .object({
    full_name: z
      .string()
      .min(2, { message: "Name must be at least 2 characters" }),
    email: z.string().email({ message: "Please enter a valid email address" }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" }),
    confirm_password: z.string(),
    phone_number: z.string().optional(),
    company: z.object({
      company_name: z.string().min(1, { message: "Company name is required" }),
      website: z
        .string()
        .url({ message: "Please enter a valid URL" })
        .optional(),
      industry: z.string().optional(),
    }),
    terms: z.boolean().refine((val) => val === true, {
      message: "You must accept the terms and conditions",
    }),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Passwords do not match",
    path: ["confirm_password"],
  });

export default function Register() {
  const router = useRouter();
  const [userRole, setUserRole] = useState<UserRole>("vehicle_owner");
  const [isVehicleOwnerLoading, setIsVehicleOwnerLoading] = useState(false);
  const [isAdvertiserLoading, setIsAdvertiserLoading] = useState(false);

  // Vehicle owner form
  const vehicleOwnerForm = useForm<VehicleOwnerFormValues>({
    resolver: zodResolver(vehicleOwnerFormSchema),
    defaultValues: {
      full_name: "",
      email: "",
      password: "",
      confirm_password: "",
      phone_number: "",
      terms: false,
    },
  });

  // Advertiser form
  const advertiserForm = useForm<AdvertiserFormValues>({
    resolver: zodResolver(advertiserFormSchema),
    defaultValues: {
      full_name: "",
      email: "",
      password: "",
      confirm_password: "",
      phone_number: "",
      company: {
        company_name: "",
        website: "",
        industry: "",
      },
      terms: false,
    },
  });

  // Form submission handlers
  const onVehicleOwnerSubmit = async (data: VehicleOwnerFormValues) => {
    try {
      setIsVehicleOwnerLoading(true);
      // Convert form data to match our API types
      const registrationData: VehicleOwnerRegistrationForm = {
        full_name: data.full_name,
        email: data.email,
        password: data.password,
        phone_number: data.phone_number,
      };

      // Send the data to our API route
      const response = await fetch("/api/auth/register/vehicle-owner", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(registrationData),
      });

      const result = await response.json();

      if (!response.ok) {
        toast.error(result.error || "Registration failed");
        throw new Error(result.error || "Registration failed");
      }

      toast.success(
        "Registration successful! Redirecting to vehicle information page..."
      );

      // Redirect to vehicle information page after successful registration
      router.push("/onboarding/vehicle-info");
    } catch (error) {
      console.error("Registration error:", error);
      // Error is already shown via toast
    } finally {
      setIsVehicleOwnerLoading(false);
    }
  };

  const onAdvertiserSubmit = async (data: AdvertiserFormValues) => {
    try {
      setIsAdvertiserLoading(true);
      // Convert form data to match our API types
      const registrationData: AdvertiserRegistrationForm = {
        full_name: data.full_name,
        email: data.email,
        password: data.password,
        phone_number: data.phone_number,
        company: {
          company_name: data.company.company_name,
          website: data.company.website,
          industry: data.company.industry,
        },
      };

      // Send the data to our API route
      const response = await fetch("/api/auth/register/advertiser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(registrationData),
      });

      const result = await response.json();

      if (!response.ok) {
        toast.error(result.error || "Registration failed");
        throw new Error(result.error || "Registration failed");
      }

      toast.success(
        "Advertiser registration successful! Redirecting to dashboard..."
      );

      // Redirect to dashboard
      router.push("/dashboard");
    } catch (error) {
      console.error("Registration error:", error);
      // Error is already shown via toast
    } finally {
      setIsAdvertiserLoading(false);
    }
  };

  // Animation variants
  const tabVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
  };

  return (
    <div className="min-h-screen py-12">
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
              <motion.button
                className={`px-6 py-2 rounded-md transition-all duration-300 ${
                  userRole === "vehicle_owner"
                    ? "bg-blue-500 text-white shadow-md"
                    : "hover:bg-foreground/5"
                }`}
                onClick={() => setUserRole("vehicle_owner")}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Vehicle Owner
              </motion.button>
              <motion.button
                className={`px-6 py-2 rounded-md transition-all duration-300 ${
                  userRole === "advertiser"
                    ? "bg-teal-500 text-white shadow-md"
                    : "hover:bg-foreground/5"
                }`}
                onClick={() => setUserRole("advertiser")}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Advertiser
              </motion.button>
            </div>
          </div>

          <AnimatePresence mode="wait">
            {userRole === "vehicle_owner" ? (
              <motion.div
                key="vehicle-owner-form"
                variants={tabVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <Form {...vehicleOwnerForm}>
                  <form
                    onSubmit={vehicleOwnerForm.handleSubmit(
                      onVehicleOwnerSubmit
                    )}
                    className="space-y-6"
                  >
                    {/* Personal Information */}
                    <div className="space-y-4">
                      <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400">
                        Personal Information
                      </h3>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={vehicleOwnerForm.control}
                          name="full_name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Full Name</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="John Doe"
                                  {...field}
                                  className="border-foreground/20 focus:border-blue-500 focus:ring-blue-500"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={vehicleOwnerForm.control}
                          name="phone_number"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Phone Number (Optional)</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="+1 (555) 123-4567"
                                  {...field}
                                  className="border-foreground/20 focus:border-blue-500 focus:ring-blue-500"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={vehicleOwnerForm.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email Address</FormLabel>
                            <FormControl>
                              <Input
                                type="email"
                                placeholder="john.doe@example.com"
                                {...field}
                                className="border-foreground/20 focus:border-blue-500 focus:ring-blue-500"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={vehicleOwnerForm.control}
                          name="password"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Password</FormLabel>
                              <FormControl>
                                <Input
                                  type="password"
                                  {...field}
                                  className="border-foreground/20 focus:border-blue-500 focus:ring-blue-500"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={vehicleOwnerForm.control}
                          name="confirm_password"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Confirm Password</FormLabel>
                              <FormControl>
                                <Input
                                  type="password"
                                  {...field}
                                  className="border-foreground/20 focus:border-blue-500 focus:ring-blue-500"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>

                    {/* Terms and Conditions */}
                    <FormField
                      control={vehicleOwnerForm.control}
                      name="terms"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0 pt-4 border-t border-foreground/10">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                              className="data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500"
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>
                              I agree to the{" "}
                              <Link
                                href="/terms"
                                className="text-blue-500 hover:underline"
                              >
                                Terms and Conditions
                              </Link>{" "}
                              and{" "}
                              <Link
                                href="/privacy"
                                className="text-blue-500 hover:underline"
                              >
                                Privacy Policy
                              </Link>
                            </FormLabel>
                            <FormMessage />
                          </div>
                        </FormItem>
                      )}
                    />

                    <motion.div
                      whileHover={{ scale: isVehicleOwnerLoading ? 1 : 1.02 }}
                      whileTap={{ scale: isVehicleOwnerLoading ? 1 : 0.98 }}
                    >
                      <Button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                        disabled={isVehicleOwnerLoading}
                      >
                        {isVehicleOwnerLoading ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Creating Account...
                          </>
                        ) : (
                          "Create Vehicle Owner Account"
                        )}
                      </Button>
                    </motion.div>
                  </form>
                </Form>
              </motion.div>
            ) : (
              <motion.div
                key="advertiser-form"
                variants={tabVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <Form {...advertiserForm}>
                  <form
                    onSubmit={advertiserForm.handleSubmit(onAdvertiserSubmit)}
                    className="space-y-6"
                  >
                    {/* Personal Information */}
                    <div className="space-y-4">
                      <h3 className="text-xl font-semibold text-teal-600 dark:text-teal-400">
                        Personal Information
                      </h3>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={advertiserForm.control}
                          name="full_name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Full Name</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="John Doe"
                                  {...field}
                                  className="border-foreground/20 focus:border-teal-500 focus:ring-teal-500"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={advertiserForm.control}
                          name="phone_number"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Phone Number (Optional)</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="+1 (555) 123-4567"
                                  {...field}
                                  className="border-foreground/20 focus:border-teal-500 focus:ring-teal-500"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={advertiserForm.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email Address</FormLabel>
                            <FormControl>
                              <Input
                                type="email"
                                placeholder="john.doe@example.com"
                                {...field}
                                className="border-foreground/20 focus:border-teal-500 focus:ring-teal-500"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={advertiserForm.control}
                          name="password"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Password</FormLabel>
                              <FormControl>
                                <Input
                                  type="password"
                                  {...field}
                                  className="border-foreground/20 focus:border-teal-500 focus:ring-teal-500"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={advertiserForm.control}
                          name="confirm_password"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Confirm Password</FormLabel>
                              <FormControl>
                                <Input
                                  type="password"
                                  {...field}
                                  className="border-foreground/20 focus:border-teal-500 focus:ring-teal-500"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>

                    {/* Company Information */}
                    <div className="space-y-4 pt-4 border-t border-foreground/10">
                      <h3 className="text-xl font-semibold text-teal-600 dark:text-teal-400">
                        Company Information
                      </h3>

                      <FormField
                        control={advertiserForm.control}
                        name="company.company_name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Company Name</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Acme Corporation"
                                {...field}
                                className="border-foreground/20 focus:border-teal-500 focus:ring-teal-500"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={advertiserForm.control}
                          name="company.website"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Website (Optional)</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="https://www.example.com"
                                  {...field}
                                  className="border-foreground/20 focus:border-teal-500 focus:ring-teal-500"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={advertiserForm.control}
                          name="company.industry"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Industry (Optional)</FormLabel>
                              <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger className="border-foreground/20 focus:ring-teal-500 bg-background">
                                    <SelectValue placeholder="Select an industry" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent className="bg-popover border border-border shadow-md">
                                  <SelectItem
                                    value="technology"
                                    className="cursor-pointer hover:bg-muted"
                                  >
                                    Technology
                                  </SelectItem>
                                  <SelectItem
                                    value="retail"
                                    className="cursor-pointer hover:bg-muted"
                                  >
                                    Retail
                                  </SelectItem>
                                  <SelectItem
                                    value="healthcare"
                                    className="cursor-pointer hover:bg-muted"
                                  >
                                    Healthcare
                                  </SelectItem>
                                  <SelectItem
                                    value="finance"
                                    className="cursor-pointer hover:bg-muted"
                                  >
                                    Finance
                                  </SelectItem>
                                  <SelectItem
                                    value="education"
                                    className="cursor-pointer hover:bg-muted"
                                  >
                                    Education
                                  </SelectItem>
                                  <SelectItem
                                    value="entertainment"
                                    className="cursor-pointer hover:bg-muted"
                                  >
                                    Entertainment
                                  </SelectItem>
                                  <SelectItem
                                    value="food"
                                    className="cursor-pointer hover:bg-muted"
                                  >
                                    Food & Beverage
                                  </SelectItem>
                                  <SelectItem
                                    value="other"
                                    className="cursor-pointer hover:bg-muted"
                                  >
                                    Other
                                  </SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>

                    {/* Terms and Conditions */}
                    <FormField
                      control={advertiserForm.control}
                      name="terms"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0 pt-4 border-t border-foreground/10">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                              className="data-[state=checked]:bg-teal-500 data-[state=checked]:border-teal-500"
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>
                              I agree to the{" "}
                              <Link
                                href="/terms"
                                className="text-teal-500 hover:underline"
                              >
                                Terms and Conditions
                              </Link>{" "}
                              and{" "}
                              <Link
                                href="/privacy"
                                className="text-teal-500 hover:underline"
                              >
                                Privacy Policy
                              </Link>
                            </FormLabel>
                            <FormMessage />
                          </div>
                        </FormItem>
                      )}
                    />

                    <motion.div
                      whileHover={{ scale: isAdvertiserLoading ? 1 : 1.02 }}
                      whileTap={{ scale: isAdvertiserLoading ? 1 : 0.98 }}
                    >
                      <Button
                        type="submit"
                        className="w-full bg-teal-600 hover:bg-teal-700 text-white"
                        disabled={isAdvertiserLoading}
                      >
                        {isAdvertiserLoading ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Creating Account...
                          </>
                        ) : (
                          "Create Advertiser Account"
                        )}
                      </Button>
                    </motion.div>
                  </form>
                </Form>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="mt-8 pt-4 border-t border-foreground/10 text-center">
            <p className="text-sm text-foreground/70">
              Already have an account?{" "}
              <Link
                href="/login"
                className={`font-medium hover:underline ${
                  userRole === "vehicle_owner"
                    ? "text-blue-500"
                    : "text-teal-500"
                }`}
              >
                Log in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
