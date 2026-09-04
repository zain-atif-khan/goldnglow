-- ==============================================================================
-- GOLD N GLOW - LUXURY JEWELLERY CMS DATABASE SCHEMA
-- Compatible with Supabase PostgreSQL, Row Level Security (RLS) & Realtime
-- ==============================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. SITE SETTINGS & CONTACT INFO
CREATE TABLE IF NOT EXISTS public.site_settings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    brand_name TEXT NOT NULL DEFAULT 'GOLD N GLOW',
    tagline TEXT NOT NULL DEFAULT 'TIMELESS BEAUTY. TRUSTED SINCE 2002',
    positioning TEXT DEFAULT 'Hyderabad''s trusted premium bangle store',
    phone TEXT NOT NULL DEFAULT '+91 98490 12345',
    whatsapp TEXT NOT NULL DEFAULT '+919849012345',
    email TEXT DEFAULT 'contact@goldnglow.in',
    address_line1 TEXT DEFAULT 'Tolichowki, Hyderabad',
    address_line2 TEXT DEFAULT 'Telangana 500008',
    store_timings TEXT DEFAULT '10:30 AM – 9:00 PM',
    store_days TEXT DEFAULT 'All Days Open',
    google_maps_url TEXT DEFAULT 'https://maps.google.com/?q=Gold+N+Glow+Tolichowki+Hyderabad',
    instagram_url TEXT DEFAULT 'https://instagram.com/goldnglow',
    facebook_url TEXT DEFAULT 'https://facebook.com/goldnglow',
    youtube_url TEXT DEFAULT 'https://youtube.com',
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. HERO SECTION
CREATE TABLE IF NOT EXISTS public.hero_sections (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    badge_text TEXT NOT NULL DEFAULT 'INDIA''S FINEST CURATED BANGLES',
    heading_line1 TEXT NOT NULL DEFAULT 'Timeless Elegance.',
    heading_line2 TEXT NOT NULL DEFAULT 'Crafted to Perfection.',
    description TEXT NOT NULL DEFAULT 'For over two decades, Gold N Glow has been Hyderabad''s destination for the world''s most exquisite bangles.',
    primary_btn_text TEXT DEFAULT 'EXPLORE COLLECTIONS',
    primary_btn_link TEXT DEFAULT '#collections',
    secondary_btn_text TEXT DEFAULT 'OUR STORY',
    secondary_btn_link TEXT DEFAULT '#story',
    image_url TEXT NOT NULL DEFAULT '/assets/hero/hero-bangles.png',
    background_image_url TEXT DEFAULT '/assets/hero/hero-full-bg.png',
    active BOOLEAN DEFAULT true,
    display_order INT DEFAULT 1,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. COLLECTIONS (STRIP & LARGE SIGNATURE)
CREATE TABLE IF NOT EXISTS public.collections (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    subtitle TEXT,
    description TEXT,
    category TEXT NOT NULL DEFAULT 'signature', -- 'strip', 'signature', 'bridal'
    image_url TEXT NOT NULL,
    link_url TEXT DEFAULT '#',
    badge_label TEXT,
    display_order INT DEFAULT 0,
    featured BOOLEAN DEFAULT true,
    active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. FOUNDER CONTENT & STORY
CREATE TABLE IF NOT EXISTS public.founder_content (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    section_number TEXT DEFAULT '04',
    section_tag TEXT DEFAULT 'OUR JOURNEY SINCE 2002',
    heading_part1 TEXT DEFAULT 'A Legacy Built on ',
    heading_accent TEXT DEFAULT 'Trust,',
    heading_part2 TEXT DEFAULT ' Passion & Perfection.',
    story_p1 TEXT NOT NULL DEFAULT 'What started in 2002 as a small dream has today become Hyderabad''s most trusted name in bangles.',
    story_p2 TEXT NOT NULL DEFAULT 'Our promise remains the same — exceptional quality, honest value, and a shopping experience you''ll always cherish.',
    founder_name TEXT NOT NULL DEFAULT 'Syed Owais Ahmed',
    founder_role TEXT NOT NULL DEFAULT 'FOUNDER, GOLD N GLOW',
    founder_image_url TEXT NOT NULL DEFAULT '/assets/founder/syed-owais-ahmed.png',
    signature_image_url TEXT DEFAULT '/assets/founder/founder-signature.png',
    founder_quote TEXT DEFAULT 'Every bangle in our collection is handpicked with care. Only the best makes it to Gold N Glow.',
    button_text TEXT DEFAULT 'MEET OUR FOUNDER',
    button_link TEXT DEFAULT '#about',
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 5. FOUNDER PICKS
CREATE TABLE IF NOT EXISTS public.founder_picks (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    pick_number TEXT NOT NULL, -- '01', '02', '03'
    title TEXT NOT NULL,
    tagline TEXT NOT NULL,
    description TEXT,
    image_url TEXT NOT NULL,
    display_order INT DEFAULT 0,
    active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 6. WHY GOLD N GLOW & TRUST PROMISES
CREATE TABLE IF NOT EXISTS public.why_us_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    subtitle TEXT NOT NULL,
    icon_name TEXT NOT NULL DEFAULT 'Award',
    category TEXT NOT NULL DEFAULT 'pill', -- 'pill' or 'promise'
    display_order INT DEFAULT 0,
    active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 7. EXPERIENCE SECTION
CREATE TABLE IF NOT EXISTS public.experience_content (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    section_number TEXT DEFAULT '08',
    heading_line1 TEXT DEFAULT 'Come See Them.',
    heading_line2 TEXT DEFAULT 'Feel Them. Choose Them.',
    description TEXT DEFAULT 'Step into our Hyderabad store and explore an exquisite range of bangles in person. Because some beauty is meant to be felt.',
    button_text TEXT DEFAULT 'VISIT OUR STORE',
    main_image_url TEXT DEFAULT '/assets/store/store-interior-main.jpg',
    exterior_image_url TEXT DEFAULT '/assets/store/store-exterior.jpg',
    showcase_image_url TEXT DEFAULT '/assets/store/store-showcase.jpg',
    customers_image_url TEXT DEFAULT '/assets/store/store-customers.jpg',
    video_url TEXT DEFAULT 'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ',
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 8. TESTIMONIALS (VOICES OF TRUST)
CREATE TABLE IF NOT EXISTS public.testimonials (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    customer_name TEXT NOT NULL,
    customer_location TEXT NOT NULL DEFAULT 'Hyderabad',
    rating INT NOT NULL DEFAULT 5,
    testimonial TEXT NOT NULL,
    photo_url TEXT NOT NULL,
    display_order INT DEFAULT 0,
    published BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 9. JOURNAL & GUIDES (ARTICLES)
CREATE TABLE IF NOT EXISTS public.journal_posts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    category TEXT NOT NULL DEFAULT 'BANGLE GUIDE',
    excerpt TEXT,
    content TEXT NOT NULL,
    cover_image_url TEXT NOT NULL,
    author TEXT DEFAULT 'Syed Owais Ahmed',
    published_date DATE DEFAULT CURRENT_DATE,
    published BOOLEAN DEFAULT true,
    display_order INT DEFAULT 0,
    seo_title TEXT,
    seo_description TEXT,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 10. MEDIA ASSETS
CREATE TABLE IF NOT EXISTS public.media_assets (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    file_name TEXT NOT NULL,
    file_path TEXT NOT NULL,
    file_url TEXT NOT NULL,
    file_size INT,
    mime_type TEXT,
    category TEXT DEFAULT 'general',
    alt_text TEXT,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 11. ENQUIRIES & CATALOGUE DOWNLOADS
CREATE TABLE IF NOT EXISTS public.enquiries (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    phone TEXT NOT NULL,
    email TEXT,
    interest TEXT DEFAULT 'Bridal Bangles',
    message TEXT,
    status TEXT DEFAULT 'new',
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ==============================================================================
-- ENABLE ROW LEVEL SECURITY (RLS)
-- ==============================================================================
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.hero_sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.collections ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.founder_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.founder_picks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.why_us_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.experience_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.journal_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.media_assets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.enquiries ENABLE ROW LEVEL SECURITY;

-- Public READ policies for all visitor-facing tables
CREATE POLICY "Public Read Site Settings" ON public.site_settings FOR SELECT USING (true);
CREATE POLICY "Public Read Hero" ON public.hero_sections FOR SELECT USING (true);
CREATE POLICY "Public Read Collections" ON public.collections FOR SELECT USING (true);
CREATE POLICY "Public Read Founder Content" ON public.founder_content FOR SELECT USING (true);
CREATE POLICY "Public Read Founder Picks" ON public.founder_picks FOR SELECT USING (true);
CREATE POLICY "Public Read Why Us" ON public.why_us_items FOR SELECT USING (true);
CREATE POLICY "Public Read Experience" ON public.experience_content FOR SELECT USING (true);
CREATE POLICY "Public Read Testimonials" ON public.testimonials FOR SELECT USING (true);
CREATE POLICY "Public Read Journal" ON public.journal_posts FOR SELECT USING (true);
CREATE POLICY "Public Read Media" ON public.media_assets FOR SELECT USING (true);
CREATE POLICY "Public Insert Enquiries" ON public.enquiries FOR INSERT WITH CHECK (true);

-- Authenticated ADMIN FULL ACCESS policies
CREATE POLICY "Admin Full Settings" ON public.site_settings FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin Full Hero" ON public.hero_sections FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin Full Collections" ON public.collections FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin Full Founder" ON public.founder_content FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin Full Picks" ON public.founder_picks FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin Full Why Us" ON public.why_us_items FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin Full Experience" ON public.experience_content FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin Full Testimonials" ON public.testimonials FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin Full Journal" ON public.journal_posts FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin Full Media" ON public.media_assets FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin Full Enquiries" ON public.enquiries FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Realtime publication
ALTER PUBLICATION supabase_realtime ADD TABLE 
  public.site_settings,
  public.hero_sections,
  public.collections,
  public.founder_content,
  public.founder_picks,
  public.why_us_items,
  public.experience_content,
  public.testimonials,
  public.journal_posts,
  public.media_assets,
  public.enquiries;
