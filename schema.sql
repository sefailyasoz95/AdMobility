CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    full_name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,  -- Hashed password
    phone_number TEXT UNIQUE,
    role TEXT CHECK (role IN ('vehicle_owner', 'advertiser')) NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);
CREATE TABLE vehicles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    owner_id UUID REFERENCES users(id) ON DELETE CASCADE,
    make TEXT NOT NULL,  -- e.g., Toyota
    model TEXT NOT NULL, -- e.g., Corolla
    year INT NOT NULL,  
    plate_number TEXT UNIQUE NOT NULL,
    mileage INT NOT NULL,  -- in km
    average_daily_km INT,
    city TEXT NOT NULL,
    status TEXT CHECK (status IN ('open_for_offers', 'offer_under_review', 'ad_active', 'closed_for_offers')) DEFAULT 'open_for_offers',
    created_at TIMESTAMP DEFAULT NOW()
);
CREATE TABLE advertisers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    company_name TEXT NOT NULL,
    website TEXT,
    industry TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);
CREATE TABLE offers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    advertiser_id UUID REFERENCES advertisers(id) ON DELETE CASCADE,
    vehicle_id UUID REFERENCES vehicles(id) ON DELETE CASCADE,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    total_payment DECIMAL(10,2) NOT NULL,
    daily_payment DECIMAL(10,2) NOT NULL,
    status TEXT CHECK (status IN ('pending', 'accepted', 'rejected', 'active', 'completed', 'canceled')) DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT NOW()
);
CREATE TABLE payments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    offer_id UUID REFERENCES offers(id) ON DELETE CASCADE,
    advertiser_id UUID REFERENCES advertisers(id) ON DELETE CASCADE,
    vehicle_owner_id UUID REFERENCES users(id) ON DELETE CASCADE,
    total_amount DECIMAL(10,2) NOT NULL,
    app_fee DECIMAL(10,2) NOT NULL, -- 10% of total amount
    owner_earning DECIMAL(10,2) NOT NULL, -- total_amount - app_fee
    status TEXT CHECK (status IN ('pending', 'processed', 'failed')) DEFAULT 'pending',
    processed_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT NOW()
);
CREATE TABLE daily_reports (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    offer_id UUID REFERENCES offers(id) ON DELETE CASCADE,
    vehicle_owner_id UUID REFERENCES users(id) ON DELETE CASCADE,
    photo_url TEXT NOT NULL, -- Image of the ad on the car
    mileage INT NOT NULL, -- User-reported mileage
    report_date DATE NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);
CREATE TABLE penalties (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    offer_id UUID REFERENCES offers(id) ON DELETE CASCADE,
    vehicle_owner_id UUID REFERENCES users(id) ON DELETE CASCADE,
    penalty_reason TEXT CHECK (penalty_reason IN ('early_ad_removal', 'missed_daily_photo')) NOT NULL,
    penalty_amount DECIMAL(10,2) NOT NULL,
    status TEXT CHECK (status IN ('pending', 'deducted', 'waived')) DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT NOW()
);
CREATE TABLE ad_material_delivery (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    offer_id UUID REFERENCES offers(id) ON DELETE CASCADE,
    delivery_method TEXT CHECK (delivery_method IN ('shipping', 'in_person')) NOT NULL,
    tracking_number TEXT,  -- Required if method is 'shipping'
    delivery_status TEXT CHECK (delivery_status IN ('pending', 'delivered', 'confirmed')) DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT NOW()
);
CREATE TABLE notifications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    message TEXT NOT NULL,
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT NOW()
);
