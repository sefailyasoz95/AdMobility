AdMobility - PRD (Product Requirements Document)

1. Project Overview
   AdMobility is a platform that allows vehicle owners to earn money by placing advertisements on their vehicles. Advertisers can send offers to vehicle owners, and vehicle owners can accept or reject the offers based on the terms provided. The platform ensures that both the vehicle owners and advertisers comply with the agreed terms, such as daily photo uploads, mileage tracking, and timely payments.

Platform:

Web: Next.js
Mobile: React Native (Expo)
Backend (MVP): Supabase (for authentication, database, and file storage)
Backend (Future): NestJS (for scalability and advanced features) 2. Target Users
Vehicle Owners: Individuals who own vehicles and want to monetize their vehicles by placing advertisements on them.
Advertisers: Companies or ad agencies looking to place ads on vehicles to reach a broader audience. 3. Core Features and Functionality
Vehicle Owner Features
Sign-Up & Profile Creation:

Vehicle owners sign up and enter details such as car make, model, year, mileage, daily/average km, and city.
Profile status options: "Open for Offers", "Offer Under Review", "Ad Active", "Closed for Offers".
Offer Management:

Vehicle owners can accept or reject offers from advertisers.
Each offer contains terms such as ad duration, payment, and conditions.
Ad Duration & Daily Photo Upload:

Vehicle owners are required to upload daily photos showing the ad on their vehicle.
If a photo is not uploaded for the day, it is considered as no ad display for that day.
Mileage Tracking:

Track daily and monthly mileage to verify the conditions agreed upon with advertisers.
Mileage tracking can be verified based on user input or integrated with a GPS/mileage app.
Ad Removal Penalties:

If a vehicle owner removes the ad early, penalties are applied.
The penalty is based on the daily cost of the ad and deducted from the final payment.
Advertiser Features
Sign-Up & Profile Creation:

Advertisers sign up and create a company profile, including details for ad campaigns.
Advertisers can send offers to vehicle owners based on vehicle details and location.
Offer Creation:

Advertisers create an offer for a vehicle owner that includes ad duration, payment, and other terms.
Advertisers can also view the status of their offers and vehicle owner responses.
Payment Handling:

Advertisers make an upfront payment when placing the offer.
The payment is held until the end of the advertising period, and vehicle owners are paid upon verification of photo uploads and mileage.
Ad Materials Delivery:

Advertisers can choose either shipping or in-person delivery of ad materials to the vehicle owner.
If shipped, the shipping cost is borne by the advertiser. For in-person delivery, the vehicle owner and advertiser agree on the method.
Payment & Security
Advertiser Payment:

Advertisers pay the full amount upfront. However, the payment will only be transferred to the vehicle owner after the ad period is complete, and the required photo and mileage verifications are done.
App Fee:

The platform charges a 10% service fee on each transaction.
Penalties:

Early Ad Removal: If the vehicle owner removes the ad early, a penalty based on the daily rate is applied.
Photo Upload Requirement: If the vehicle owner does not upload the required daily photo, the advertiser is refunded a portion of the daily budget for that day.
Technology Stack
Frontend:

Web: Built using Next.js, which will provide fast and responsive user interfaces.
Mobile: Built using React Native (Expo), ensuring cross-platform compatibility (iOS and Android).
Backend (MVP):

Supabase: For database management, user authentication, and file storage.
Future: Transitioning to NestJS for more complex logic and scalability as the app grows.
Database:

Stores vehicle owner profiles, offer details, payment history, and ad campaign details.
Geolocation and Tracking:

Integration with third-party APIs (e.g., Google Maps) to track mileage and verify vehicle movement when necessary. 4. User Flow
Vehicle Owner Flow
Sign Up & Profile Setup: The vehicle owner creates an account and fills in their vehicle details.
Receive Offers: Vehicle owners receive ad placement offers from advertisers.
Accept/Reject Offers: Vehicle owners can accept or reject offers based on terms.
Ad Display: Once the offer is accepted, the vehicle owner must upload daily photos showing the ad placement.
Mileage Tracking: The system tracks the mileage of the vehicle based on daily updates or integrated with a mileage tracking app.
Payment: After the ad period ends, vehicle owners receive payment after the photo and mileage verifications.
Advertiser Flow
Sign Up & Profile Setup: The advertiser creates an account and sets up their company profile.
Create Offer: Advertisers create an offer for a specific vehicle owner and send it.
Payment: Advertisers make an upfront payment for the ad campaign.
Delivery of Materials: Advertisers send the ad materials to the vehicle owner.
Monitor Campaign: Advertisers can monitor the progress of their campaigns via the platform.
Payment Transfer: After the ad period concludes and verifications are done, the vehicle owner is paid. 5. Milestones and Timeline
Phase 1 (8-10 Weeks):
Development of basic features: vehicle owner and advertiser registration, offer management, payment processing, and photo upload functionality.
Backend setup using Supabase.
Basic payment gateway integration for upfront payments.
Phase 2 (6-8 Weeks):
Enhancements to payment handling, penalties, and photo upload reminders.
Integration of mileage tracking for vehicle owners.
Complete admin panel for monitoring campaigns, payments, and penalties.
Phase 3 (4-6 Weeks):
Transition to NestJS for future scalability.
Performance improvements and bug fixes.
Test and fine-tune the platform with beta users. 6. Backend Details (Supabase for MVP)
Authentication: Use Supabase's authentication system for secure sign-ups and logins.
Database: Store user data (vehicle owners and advertisers), ad details, payments, and penalties.
File Storage: Use Supabase Storage for photo uploads (daily photos for ad verification).
Notifications: Use Supabase functions to send notifications to users (e.g., daily photo reminders, payment alerts). 7. Monetization Strategy
Service Fee: The platform takes a 10% fee from each transaction.
Future Features: Additional premium features (e.g., more detailed campaign analytics, advanced geolocation features) could be added as the platform scales. 8. Security and Compliance
User Data Protection: Ensure all user data, including payment information, is securely handled and stored.
Payment Processing: Use a trusted third-party payment processor to handle payments securely.

Type and database reference always will be schema.sql and types.ts files
Supabase request always be done through the api routes. client side usage is forbidden
