export interface SiteSettings {
  id: string;
  brand_name: string;
  tagline: string;
  positioning: string;
  phone: string;
  whatsapp: string;
  email: string;
  address_line1: string;
  address_line2: string;
  store_timings: string;
  store_days: string;
  google_maps_url: string;
  instagram_url: string;
  facebook_url: string;
  youtube_url: string;
  updated_at?: string;
}

export interface HeroContent {
  id: string;
  badge_text: string;
  heading_line1: string;
  heading_line2: string;
  description: string;
  primary_btn_text: string;
  primary_btn_link: string;
  secondary_btn_text: string;
  secondary_btn_link: string;
  image_url: string;
  background_image_url?: string;
  video_url?: string;
  active: boolean;
  display_order: number;
}

export interface CollectionItem {
  id: string;
  title: string;
  subtitle?: string;
  description?: string;
  category: 'lac' | 'glass' | 'bridal' | 'strip' | 'signature' | 'festive' | 'classic' | string;
  material?: 'Lac' | 'Glass' | 'Lac & Glass';
  image_url: string;
  link_url?: string;
  badge_label?: string;
  display_order: number;
  featured: boolean;
  active: boolean;
}

export interface FounderContent {
  id: string;
  section_number: string;
  section_tag: string;
  heading_part1: string;
  heading_accent: string;
  heading_part2: string;
  story_p1: string;
  story_p2: string;
  founder_name: string;
  founder_role: string;
  founder_image_url: string;
  signature_image_url: string;
  founder_quote: string;
  button_text: string;
  button_link: string;
}

export interface FounderPick {
  id: string;
  pick_number: string;
  title: string;
  tagline: string;
  description: string;
  image_url: string;
  display_order: number;
  active: boolean;
}

export interface WhyUsItem {
  id: string;
  title: string;
  subtitle: string;
  icon_name: string;
  category: 'pill' | 'promise';
  display_order: number;
  active: boolean;
}

export interface ExperienceContent {
  id: string;
  section_number: string;
  heading_line1: string;
  heading_line2: string;
  description: string;
  button_text: string;
  main_image_url: string;
  exterior_image_url: string;
  showcase_image_url: string;
  customers_image_url: string;
  video_url: string;
}

export interface TestimonialItem {
  id: string;
  customer_name: string;
  customer_location: string;
  rating: number;
  testimonial: string;
  photo_url: string;
  display_order: number;
  published: boolean;
}

export interface JournalPost {
  id: string;
  title: string;
  slug: string;
  category: string;
  excerpt: string;
  content: string;
  cover_image_url: string;
  author: string;
  published_date: string;
  published: boolean;
  display_order: number;
  seo_title?: string;
  seo_description?: string;
}

export interface MediaAsset {
  id: string;
  file_name: string;
  file_path: string;
  file_url: string;
  file_size?: number;
  mime_type?: string;
  category?: string;
  alt_text?: string;
  created_at: string;
}

export interface EnquiryItem {
  id: string;
  name: string;
  phone: string;
  email?: string;
  interest: string;
  message?: string;
  status: 'new' | 'contacted' | 'resolved';
  created_at: string;
}
