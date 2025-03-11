// User Types
export type UserRole = "vehicle_owner" | "advertiser";

export interface User {
  id: string; // UUID
  full_name: string;
  email: string;
  password: string; // Hashed password
  phone_number?: string;
  role: UserRole;
  created_at: Date;
}

// Vehicle Types
export type VehicleStatus =
  | "open_for_offers"
  | "offer_under_review"
  | "ad_active"
  | "closed_for_offers";

export interface Vehicle {
  id: string;
  owner_id: string;
  make: string;
  model: string;
  year: number;
  plate_number: string;
  mileage: number;
  average_daily_km?: number;
  city: string;
  status: VehicleStatus;
  created_at: Date;
  // Virtual fields for relationships
  owner?: User;
}

// Advertiser Types
export interface Advertiser {
  id: string;
  user_id: string;
  company_name: string;
  website?: string;
  industry?: string;
  created_at: Date;
  // Virtual fields for relationships
  user?: User;
}

// Offer Types
export type OfferStatus =
  | "pending"
  | "accepted"
  | "rejected"
  | "active"
  | "completed"
  | "canceled";

export interface Offer {
  id: string;
  advertiser_id: string;
  vehicle_id: string;
  start_date: Date;
  end_date: Date;
  total_payment: number;
  daily_payment: number;
  status: OfferStatus;
  created_at: Date;
  // Virtual fields for relationships
  advertiser?: Advertiser;
  vehicle?: Vehicle;
}

// Payment Types
export type PaymentStatus = "pending" | "processed" | "failed";

export interface Payment {
  id: string;
  offer_id: string;
  advertiser_id: string;
  vehicle_owner_id: string;
  total_amount: number;
  app_fee: number;
  owner_earning: number;
  status: PaymentStatus;
  processed_at?: Date;
  created_at: Date;
  // Virtual fields for relationships
  offer?: Offer;
  advertiser?: Advertiser;
  vehicle_owner?: User;
}

// Daily Report Types
export interface DailyReport {
  id: string;
  offer_id: string;
  vehicle_owner_id: string;
  photo_url: string;
  mileage: number;
  report_date: Date;
  created_at: Date;
  // Virtual fields for relationships
  offer?: Offer;
  vehicle_owner?: User;
}

// Penalty Types
export type PenaltyReason = "early_ad_removal" | "missed_daily_photo";
export type PenaltyStatus = "pending" | "deducted" | "waived";

export interface Penalty {
  id: string;
  offer_id: string;
  vehicle_owner_id: string;
  penalty_reason: PenaltyReason;
  penalty_amount: number;
  status: PenaltyStatus;
  created_at: Date;
  // Virtual fields for relationships
  offer?: Offer;
  vehicle_owner?: User;
}

// Ad Material Delivery Types
export type DeliveryMethod = "shipping" | "in_person";
export type DeliveryStatus = "pending" | "delivered" | "confirmed";

export interface AdMaterialDelivery {
  id: string;
  offer_id: string;
  delivery_method: DeliveryMethod;
  tracking_number?: string;
  delivery_status: DeliveryStatus;
  created_at: Date;
  // Virtual fields for relationships
  offer?: Offer;
}

// Notification Types
export interface Notification {
  id: string;
  user_id: string;
  message: string;
  is_read: boolean;
  created_at: Date;
  // Virtual fields for relationships
  user?: User;
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// Form Types
export interface VehicleOwnerRegistrationForm {
  full_name: string;
  email: string;
  password: string;
  phone_number?: string;
}

export interface AdvertiserRegistrationForm {
  full_name: string;
  email: string;
  password: string;
  phone_number?: string;
  company: {
    company_name: string;
    website?: string;
    industry?: string;
  };
}

export interface OfferForm {
  vehicle_id: string;
  start_date: Date;
  end_date: Date;
  total_payment: number;
  daily_payment: number;
  delivery_method: DeliveryMethod;
  tracking_number?: string;
}

export interface DailyReportForm {
  offer_id: string;
  photo_url: string;
  mileage: number;
  report_date: Date;
}

// Context Types
export interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (
    form: VehicleOwnerRegistrationForm | AdvertiserRegistrationForm
  ) => Promise<void>;
}

export interface NotificationContextType {
  notifications: Notification[];
  unreadCount: number;
  markAsRead: (id: string) => Promise<void>;
  markAllAsRead: () => Promise<void>;
  fetchNotifications: () => Promise<void>;
}

// Form Validation Types for React Hook Form
export interface VehicleOwnerFormValues {
  full_name: string;
  email: string;
  password: string;
  confirm_password: string;
  phone_number?: string;
  terms: boolean;
}

export interface AdvertiserFormValues {
  full_name: string;
  email: string;
  password: string;
  confirm_password: string;
  phone_number?: string;
  company: {
    company_name: string;
    website?: string;
    industry?: string;
  };
  terms: boolean;
}
