"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Car,
  Info,
  MapPin,
  Calendar,
  Camera,
  Upload,
  CheckCircle2,
} from "lucide-react";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/components/ui/form";
import { Input } from "@/app/components/ui/input";
import { Button } from "@/app/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select";
import { Textarea } from "@/app/components/ui/textarea";
import {
  vehicleMakes,
  vehicleModelsByMake,
  vehicleYears,
  vehicleColors,
} from "@/lib/constants/vehicles";

// Form schema
const vehicleFormSchema = z.object({
  make: z.string().min(1, "Make is required"),
  model: z.string().min(1, "Model is required"),
  year: z.string().min(1, "Year is required"),
  color: z.string().min(1, "Color is required"),
  plate_number: z.string().min(1, "License plate is required"),
  vin: z
    .string()
    .min(17, "VIN must be 17 characters")
    .max(17, "VIN must be 17 characters"),
  mileage: z.string().min(1, "Mileage is required"),
  avg_daily_miles: z.string().min(1, "Average daily miles is required"),
  vehicle_type: z.string().min(1, "Vehicle type is required"),
  primary_location: z.string().min(1, "Primary location is required"),
  description: z.string().optional(),
});

type VehicleFormValues = z.infer<typeof vehicleFormSchema>;

export default function NewVehiclePage() {
  const { user } = useAuth();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [vehicleImage, setVehicleImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [availableModels, setAvailableModels] = useState<string[]>([]);

  const form = useForm<VehicleFormValues>({
    resolver: zodResolver(vehicleFormSchema),
    defaultValues: {
      make: "",
      model: "",
      year: new Date().getFullYear().toString(),
      color: "",
      plate_number: "",
      vin: "",
      mileage: "",
      avg_daily_miles: "",
      vehicle_type: "",
      primary_location: "",
      description: "",
    },
  });

  // Watch for make changes to update model options
  const selectedMake = form.watch("make");

  useEffect(() => {
    if (selectedMake) {
      const models = vehicleModelsByMake[selectedMake] || [];
      setAvailableModels(models);

      // Reset model if the current one isn't available for the new make
      const currentModel = form.getValues("model");
      if (currentModel && !models.includes(currentModel)) {
        form.setValue("model", "");
      }
    } else {
      setAvailableModels([]);
    }
  }, [selectedMake, form]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setVehicleImage(file);

      // Create a preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (data: VehicleFormValues) => {
    if (!user) {
      toast.error("You must be logged in to register a vehicle");
      return;
    }

    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
      return;
    }

    if (!vehicleImage) {
      toast.error("Please upload a photo of your vehicle");
      return;
    }

    try {
      setIsSubmitting(true);

      // Create form data for file upload
      const formData = new FormData();
      formData.append("image", vehicleImage);

      // Add all form fields
      Object.entries(data).forEach(([key, value]) => {
        formData.append(key, value);
      });

      // Add owner ID
      formData.append("owner_id", user.id);

      // Submit to API
      const response = await fetch("/api/vehicles", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(await response.text());
      }

      toast.success("Vehicle registered successfully!");
      router.push("/dashboard");
    } catch (error) {
      console.error("Error registering vehicle:", error);
      toast.error("Failed to register vehicle. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const steps = [
    { id: 1, name: "Vehicle Details", icon: <Car className="h-5 w-5" /> },
    { id: 2, name: "Usage Information", icon: <Info className="h-5 w-5" /> },
    { id: 3, name: "Photo Upload", icon: <Camera className="h-5 w-5" /> },
  ];

  return (
    <div className="max-w-5xl mx-auto py-10 px-4 sm:px-6">
      {/* Header */}
      <div className="mb-10 text-center">
        <h1 className="text-3xl font-bold text-foreground tracking-tight mb-2">
          Register Your Vehicle
        </h1>
        <p className="text-muted-foreground">
          Provide details about your vehicle to start receiving advertising
          offers
        </p>
      </div>

      {/* Steps */}
      <div className="mb-10">
        <div className="flex items-center justify-center mb-8">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center">
              <div
                className={`flex flex-col items-center ${
                  index > 0 ? "ml-4 sm:ml-8" : ""
                }`}
              >
                <div
                  className={`w-14 h-14 rounded-full flex items-center justify-center mb-2 ${
                    currentStep >= step.id
                      ? "bg-gradient-to-r from-blue-600 to-teal-500 text-white shadow-md"
                      : "bg-gray-100 dark:bg-gray-800 text-gray-400"
                  }`}
                >
                  {step.icon}
                </div>
                <span
                  className={`text-sm font-medium ${
                    currentStep >= step.id
                      ? "text-foreground"
                      : "text-muted-foreground"
                  }`}
                >
                  {step.name}
                </span>
              </div>

              {index < steps.length - 1 && (
                <div className="hidden sm:block w-24 h-1 mx-2 bg-gray-200 dark:bg-gray-700 relative overflow-hidden">
                  {currentStep > step.id && (
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-teal-500"></div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          {/* Step 1: Vehicle Details */}
          {currentStep === 1 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <Card className="border-0 shadow-lg overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-blue-600/5 to-teal-500/5 border-b">
                  <div className="flex items-center gap-2">
                    <Car className="h-5 w-5 text-blue-500" />
                    <CardTitle>Vehicle Details</CardTitle>
                  </div>
                  <CardDescription>
                    Enter the basic information about your vehicle
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-6 space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="make"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Make</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select a make" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {vehicleMakes.map((make) => (
                                <SelectItem key={make} value={make}>
                                  {make}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="model"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Model</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            disabled={!selectedMake}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue
                                  placeholder={
                                    selectedMake
                                      ? "Select a model"
                                      : "Select a make first"
                                  }
                                />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {availableModels.map((model) => (
                                <SelectItem key={model} value={model}>
                                  {model}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="year"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Year</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select year" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {vehicleYears.map((year) => (
                                <SelectItem key={year} value={year}>
                                  {year}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="color"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Color</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select color" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {vehicleColors.map((color) => (
                                <SelectItem key={color} value={color}>
                                  {color}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="plate_number"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>License Plate</FormLabel>
                          <FormControl>
                            <Input placeholder="ABC123" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="vin"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>VIN</FormLabel>
                          <FormControl>
                            <Input placeholder="17-character VIN" {...field} />
                          </FormControl>
                          <FormDescription>
                            Vehicle Identification Number (17 characters)
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </CardContent>
              </Card>
              <div className="flex justify-end mt-6">
                <Button
                  type="button"
                  onClick={() => setCurrentStep(2)}
                  className="bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600 px-6"
                >
                  Continue
                </Button>
              </div>
            </motion.div>
          )}

          {/* Step 2: Usage Information */}
          {currentStep === 2 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <Card className="border-0 shadow-lg overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-blue-600/5 to-teal-500/5 border-b">
                  <div className="flex items-center gap-2">
                    <Info className="h-5 w-5 text-teal-500" />
                    <CardTitle>Usage Information</CardTitle>
                  </div>
                  <CardDescription>
                    Tell us how you use your vehicle
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-6 space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="mileage"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Current Mileage</FormLabel>
                          <FormControl>
                            <Input placeholder="25000" {...field} />
                          </FormControl>
                          <FormDescription>
                            Current odometer reading
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="avg_daily_miles"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Average Daily Miles</FormLabel>
                          <FormControl>
                            <Input placeholder="30" {...field} />
                          </FormControl>
                          <FormDescription>
                            How many miles do you drive on average per day?
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="vehicle_type"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Vehicle Type</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select vehicle type" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="sedan">Sedan</SelectItem>
                              <SelectItem value="suv">SUV</SelectItem>
                              <SelectItem value="truck">Truck</SelectItem>
                              <SelectItem value="van">Van</SelectItem>
                              <SelectItem value="coupe">Coupe</SelectItem>
                              <SelectItem value="hatchback">
                                Hatchback
                              </SelectItem>
                              <SelectItem value="convertible">
                                Convertible
                              </SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="primary_location"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Primary Location</FormLabel>
                          <FormControl>
                            <Input placeholder="City, State" {...field} />
                          </FormControl>
                          <FormDescription>
                            Where do you primarily drive your vehicle?
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Additional Information (Optional)</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Any additional details about your vehicle or driving habits"
                            className="resize-none min-h-[100px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
              <div className="flex justify-between mt-6">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setCurrentStep(1)}
                >
                  Back
                </Button>
                <Button
                  type="button"
                  onClick={() => setCurrentStep(3)}
                  className="bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600 px-6"
                >
                  Continue
                </Button>
              </div>
            </motion.div>
          )}

          {/* Step 3: Photo Upload */}
          {currentStep === 3 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <Card className="border-0 shadow-lg overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-blue-600/5 to-teal-500/5 border-b">
                  <div className="flex items-center gap-2">
                    <Camera className="h-5 w-5 text-blue-500" />
                    <CardTitle>Vehicle Photo</CardTitle>
                  </div>
                  <CardDescription>
                    Upload a clear photo of your vehicle
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-6">
                    <div className="border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-lg p-6 text-center hover:border-blue-400 dark:hover:border-blue-500 transition-all">
                      <input
                        type="file"
                        id="vehicle-image"
                        accept="image/*"
                        className="hidden"
                        onChange={handleImageChange}
                      />
                      {imagePreview ? (
                        <div className="space-y-4">
                          <div className="relative w-full h-64 mx-auto overflow-hidden rounded-lg shadow-md">
                            <img
                              src={imagePreview}
                              alt="Vehicle preview"
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute top-2 right-2 bg-green-500 text-white p-1 rounded-full">
                              <CheckCircle2 className="h-5 w-5" />
                            </div>
                          </div>
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => {
                              setVehicleImage(null);
                              setImagePreview(null);
                            }}
                          >
                            Remove Photo
                          </Button>
                        </div>
                      ) : (
                        <label
                          htmlFor="vehicle-image"
                          className="flex flex-col items-center justify-center h-64 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-900/10 transition-colors rounded-lg"
                        >
                          <div className="w-20 h-20 rounded-full bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center mb-4">
                            <Upload className="h-10 w-10 text-blue-500" />
                          </div>
                          <p className="text-lg font-medium">Click to upload</p>
                          <p className="text-sm text-muted-foreground">
                            Upload a clear photo of your vehicle
                          </p>
                          <p className="text-xs text-muted-foreground mt-2">
                            PNG, JPG or JPEG (max. 10MB)
                          </p>
                        </label>
                      )}
                    </div>

                    <div className="bg-blue-50 dark:bg-blue-900/10 p-4 rounded-lg border border-blue-100 dark:border-blue-900/20">
                      <h3 className="font-medium flex items-center gap-2 text-blue-700 dark:text-blue-400">
                        <Info className="h-4 w-4" />
                        Photo Guidelines
                      </h3>
                      <ul className="mt-2 text-sm text-blue-600 dark:text-blue-300 space-y-1">
                        <li>• Take the photo in good lighting</li>
                        <li>• Capture the entire vehicle from the side</li>
                        <li>• Make sure the license plate is visible</li>
                        <li>• Avoid including people in the photo</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <div className="flex justify-between mt-6">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setCurrentStep(2)}
                >
                  Back
                </Button>
                <Button
                  type="submit"
                  disabled={isSubmitting || !vehicleImage}
                  className="bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600 px-6"
                >
                  {isSubmitting ? (
                    <>
                      <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-b-transparent border-white"></span>
                      Registering...
                    </>
                  ) : (
                    "Register Vehicle"
                  )}
                </Button>
              </div>
            </motion.div>
          )}
        </form>
      </Form>
    </div>
  );
}
