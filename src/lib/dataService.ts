import { getSupabaseClient } from './supabase';
import {
  SiteSettings,
  HeroContent,
  CollectionItem,
  FounderContent,
  FounderPick,
  WhyUsItem,
  ExperienceContent,
  TestimonialItem,
  JournalPost,
  MediaAsset,
  EnquiryItem
} from './database.types';
import {
  defaultSiteSettings,
  defaultHeroContent,
  defaultCollections,
  defaultFounderContent,
  defaultFounderPicks,
  defaultWhyUsItems,
  defaultExperienceContent,
  defaultTestimonials,
  defaultJournalPosts,
  defaultMediaAssets,
} from './defaultContent';

const STORAGE_KEYS = {
  SETTINGS: 'gng_site_settings_v2',
  HERO: 'gng_hero_content_v2',
  COLLECTIONS: 'gng_collections_v2',
  FOUNDER: 'gng_founder_content_v2',
  FOUNDER_PICKS: 'gng_founder_picks_v2',
  WHY_US: 'gng_why_us_v2',
  EXPERIENCE: 'gng_experience_v2',
  TESTIMONIALS: 'gng_testimonials_v2',
  JOURNAL: 'gng_journal_v2',
  MEDIA: 'gng_media_assets_v2',
  ENQUIRIES: 'gng_enquiries_v2',
};

// Helper to broadcast local update events
function notifyContentChanged(tableName?: string) {
  window.dispatchEvent(new CustomEvent('goldnglow_realtime_update', { detail: { table: tableName } }));
}

// Subscribe to real-time updates (both Supabase Realtime + local cross-tab events)
export function subscribeToUpdates(callback: (table?: string) => void): () => void {
  const handler = (e: any) => {
    callback(e.detail?.table);
  };
  window.addEventListener('goldnglow_realtime_update', handler);

  const supabase = getSupabaseClient();
  let channel: any = null;
  if (supabase) {
    try {
      channel = supabase
        .channel('public:realtime-cms')
        .on('postgres_changes', { event: '*', schema: 'public' }, (payload: any) => {
          callback(payload.table);
        })
        .subscribe();
    } catch (e) {
      console.warn('Realtime channel error:', e);
    }
  }

  return () => {
    window.removeEventListener('goldnglow_realtime_update', handler);
    if (channel && supabase) {
      supabase.removeChannel(channel);
    }
  };
}

export const DataService = {
  // SITE SETTINGS
  async getSiteSettings(): Promise<SiteSettings> {
    const supabase = getSupabaseClient();
    if (supabase) {
      const { data, error } = await supabase.from('site_settings').select('*').single();
      if (!error && data) return data as SiteSettings;
    }
    const stored = localStorage.getItem(STORAGE_KEYS.SETTINGS);
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch (e) {}
    }
    return defaultSiteSettings;
  },

  async updateSiteSettings(settings: Partial<SiteSettings>): Promise<SiteSettings> {
    const current = await this.getSiteSettings();
    const updated = { ...current, ...settings };
    
    const supabase = getSupabaseClient();
    if (supabase) {
      await supabase.from('site_settings').upsert(updated);
    }
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(updated));
    notifyContentChanged('site_settings');
    return updated;
  },

  // HERO CONTENT
  async getHeroContent(): Promise<HeroContent> {
    const supabase = getSupabaseClient();
    if (supabase) {
      const { data, error } = await supabase.from('hero_sections').select('*').order('display_order', { ascending: true }).limit(1).single();
      if (!error && data) return data as HeroContent;
    }
    const stored = localStorage.getItem(STORAGE_KEYS.HERO);
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch (e) {}
    }
    return defaultHeroContent;
  },

  async updateHeroContent(hero: Partial<HeroContent>): Promise<HeroContent> {
    const current = await this.getHeroContent();
    const updated = { ...current, ...hero };
    
    const supabase = getSupabaseClient();
    if (supabase) {
      await supabase.from('hero_sections').upsert(updated);
    }
    localStorage.setItem(STORAGE_KEYS.HERO, JSON.stringify(updated));
    notifyContentChanged('hero_sections');
    return updated;
  },

  // COLLECTIONS (Strip, Signature & Bridal - 10 each)
  async getCollections(): Promise<CollectionItem[]> {
    const supabase = getSupabaseClient();
    if (supabase) {
      const { data, error } = await supabase.from('collections').select('*').order('display_order', { ascending: true });
      if (!error && data && data.length > 0) return data as CollectionItem[];
    }
    const stored = localStorage.getItem(STORAGE_KEYS.COLLECTIONS);
    if (stored) {
      try {
        const parsed: CollectionItem[] = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      } catch (e) {}
    }
    return defaultCollections;
  },

  async saveCollections(items: CollectionItem[]): Promise<CollectionItem[]> {
    const supabase = getSupabaseClient();
    if (supabase) {
      await supabase.from('collections').upsert(items);
    }
    localStorage.setItem(STORAGE_KEYS.COLLECTIONS, JSON.stringify(items));
    notifyContentChanged('collections');
    return items;
  },

  async updateCollectionItem(item: CollectionItem): Promise<CollectionItem> {
    const all = await this.getCollections();
    const index = all.findIndex((c) => c.id === item.id);
    if (index >= 0) {
      all[index] = item;
    } else {
      all.push(item);
    }
    await this.saveCollections(all);
    return item;
  },

  async deleteCollectionItem(id: string): Promise<void> {
    const all = await this.getCollections();
    const filtered = all.filter((c) => c.id !== id);
    const supabase = getSupabaseClient();
    if (supabase) {
      await supabase.from('collections').delete().eq('id', id);
    }
    localStorage.setItem(STORAGE_KEYS.COLLECTIONS, JSON.stringify(filtered));
    notifyContentChanged('collections');
  },

  // FOUNDER CONTENT
  async getFounderContent(): Promise<FounderContent> {
    const supabase = getSupabaseClient();
    if (supabase) {
      const { data, error } = await supabase.from('founder_content').select('*').single();
      if (!error && data) return data as FounderContent;
    }
    const stored = localStorage.getItem(STORAGE_KEYS.FOUNDER);
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch (e) {}
    }
    return defaultFounderContent;
  },

  async updateFounderContent(founder: Partial<FounderContent>): Promise<FounderContent> {
    const current = await this.getFounderContent();
    const updated = { ...current, ...founder };
    
    const supabase = getSupabaseClient();
    if (supabase) {
      await supabase.from('founder_content').upsert(updated);
    }
    localStorage.setItem(STORAGE_KEYS.FOUNDER, JSON.stringify(updated));
    notifyContentChanged('founder_content');
    return updated;
  },

  // FOUNDER PICKS
  async getFounderPicks(): Promise<FounderPick[]> {
    const supabase = getSupabaseClient();
    if (supabase) {
      const { data, error } = await supabase.from('founder_picks').select('*').order('display_order', { ascending: true });
      if (!error && data && data.length > 0) return data as FounderPick[];
    }
    const stored = localStorage.getItem(STORAGE_KEYS.FOUNDER_PICKS);
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch (e) {}
    }
    return defaultFounderPicks;
  },

  async saveFounderPicks(picks: FounderPick[]): Promise<FounderPick[]> {
    const supabase = getSupabaseClient();
    if (supabase) {
      await supabase.from('founder_picks').upsert(picks);
    }
    localStorage.setItem(STORAGE_KEYS.FOUNDER_PICKS, JSON.stringify(picks));
    notifyContentChanged('founder_picks');
    return picks;
  },

  // WHY US & PROMISES
  async getWhyUsItems(): Promise<WhyUsItem[]> {
    const supabase = getSupabaseClient();
    if (supabase) {
      const { data, error } = await supabase.from('why_us_items').select('*').order('display_order', { ascending: true });
      if (!error && data && data.length > 0) return data as WhyUsItem[];
    }
    const stored = localStorage.getItem(STORAGE_KEYS.WHY_US);
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch (e) {}
    }
    return defaultWhyUsItems;
  },

  async saveWhyUsItems(items: WhyUsItem[]): Promise<WhyUsItem[]> {
    const supabase = getSupabaseClient();
    if (supabase) {
      await supabase.from('why_us_items').upsert(items);
    }
    localStorage.setItem(STORAGE_KEYS.WHY_US, JSON.stringify(items));
    notifyContentChanged('why_us_items');
    return items;
  },

  // EXPERIENCE
  async getExperienceContent(): Promise<ExperienceContent> {
    const supabase = getSupabaseClient();
    if (supabase) {
      const { data, error } = await supabase.from('experience_content').select('*').single();
      if (!error && data) return data as ExperienceContent;
    }
    const stored = localStorage.getItem(STORAGE_KEYS.EXPERIENCE);
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch (e) {}
    }
    return defaultExperienceContent;
  },

  async updateExperienceContent(content: Partial<ExperienceContent>): Promise<ExperienceContent> {
    const current = await this.getExperienceContent();
    const updated = { ...current, ...content };
    const supabase = getSupabaseClient();
    if (supabase) {
      await supabase.from('experience_content').upsert(updated);
    }
    localStorage.setItem(STORAGE_KEYS.EXPERIENCE, JSON.stringify(updated));
    notifyContentChanged('experience_content');
    return updated;
  },

  // TESTIMONIALS
  async getTestimonials(): Promise<TestimonialItem[]> {
    const supabase = getSupabaseClient();
    if (supabase) {
      const { data, error } = await supabase.from('testimonials').select('*').order('display_order', { ascending: true });
      if (!error && data && data.length > 0) return data as TestimonialItem[];
    }
    const stored = localStorage.getItem(STORAGE_KEYS.TESTIMONIALS);
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch (e) {}
    }
    return defaultTestimonials;
  },

  async saveTestimonials(items: TestimonialItem[]): Promise<TestimonialItem[]> {
    const supabase = getSupabaseClient();
    if (supabase) {
      await supabase.from('testimonials').upsert(items);
    }
    localStorage.setItem(STORAGE_KEYS.TESTIMONIALS, JSON.stringify(items));
    notifyContentChanged('testimonials');
    return items;
  },

  async deleteTestimonial(id: string): Promise<void> {
    const all = await this.getTestimonials();
    const filtered = all.filter((t) => t.id !== id);
    const supabase = getSupabaseClient();
    if (supabase) {
      await supabase.from('testimonials').delete().eq('id', id);
    }
    localStorage.setItem(STORAGE_KEYS.TESTIMONIALS, JSON.stringify(filtered));
    notifyContentChanged('testimonials');
  },

  // JOURNAL POSTS
  async getJournalPosts(): Promise<JournalPost[]> {
    const supabase = getSupabaseClient();
    if (supabase) {
      const { data, error } = await supabase.from('journal_posts').select('*').order('display_order', { ascending: true });
      if (!error && data && data.length > 0) return data as JournalPost[];
    }
    const stored = localStorage.getItem(STORAGE_KEYS.JOURNAL);
    if (stored) {
      try {
        const parsed: JournalPost[] = JSON.parse(stored);
        const upgraded = parsed.map((post) => {
          if (post.cover_image_url?.includes('bangle-styling-guide.jpg')) post.cover_image_url = '/assets/journal/journal-how-to-choose.png';
          if (post.cover_image_url?.includes('bangle-craftsmanship.jpg')) post.cover_image_url = '/assets/journal/journal-bridal-guide.png';
          if (post.cover_image_url?.includes('bangle-care-guide.jpg')) post.cover_image_url = '/assets/journal/journal-premium-bangles.png';
          return post;
        });
        return upgraded;
      } catch (e) {}
    }
    return defaultJournalPosts;
  },

  async saveJournalPost(post: JournalPost): Promise<JournalPost> {
    const all = await this.getJournalPosts();
    const index = all.findIndex((p) => p.id === post.id);
    if (index >= 0) {
      all[index] = post;
    } else {
      all.unshift(post);
    }
    const supabase = getSupabaseClient();
    if (supabase) {
      await supabase.from('journal_posts').upsert(post);
    }
    localStorage.setItem(STORAGE_KEYS.JOURNAL, JSON.stringify(all));
    notifyContentChanged('journal_posts');
    return post;
  },

  async deleteJournalPost(id: string): Promise<void> {
    const all = await this.getJournalPosts();
    const filtered = all.filter((p) => p.id !== id);
    const supabase = getSupabaseClient();
    if (supabase) {
      await supabase.from('journal_posts').delete().eq('id', id);
    }
    localStorage.setItem(STORAGE_KEYS.JOURNAL, JSON.stringify(filtered));
    notifyContentChanged('journal_posts');
  },

  // MEDIA ASSETS & FILE UPLOADS
  async getMediaAssets(): Promise<MediaAsset[]> {
    const supabase = getSupabaseClient();
    if (supabase) {
      const { data, error } = await supabase.from('media_assets').select('*').order('created_at', { ascending: false });
      if (!error && data && data.length > 0) return data as MediaAsset[];
    }
    const stored = localStorage.getItem(STORAGE_KEYS.MEDIA);
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch (e) {}
    }
    return defaultMediaAssets;
  },

  async uploadFile(file: File, category: string = 'general'): Promise<string> {
    const supabase = getSupabaseClient();
    const fileName = `${Date.now()}_${file.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`;

    if (supabase) {
      try {
        // Try uploading to 'images' bucket
        const { data, error } = await supabase.storage.from('images').upload(`uploads/${fileName}`, file, {
          cacheControl: '3600',
          upsert: true,
        });

        if (!error && data) {
          const { data: publicUrlData } = supabase.storage.from('images').getPublicUrl(`uploads/${fileName}`);
          const fileUrl = publicUrlData.publicUrl;

          // Record in media assets
          const newAsset: MediaAsset = {
            id: `media-${Date.now()}`,
            file_name: file.name,
            file_path: data.path,
            file_url: fileUrl,
            file_size: file.size,
            mime_type: file.type,
            category,
            created_at: new Date().toISOString(),
          };
          await supabase.from('media_assets').insert(newAsset);
          return fileUrl;
        }
      } catch (err) {
        console.warn('Supabase storage upload failed, falling back to local dataURL storage:', err);
      }
    }

    // Local Storage / DataURL Fallback
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const fileUrl = e.target?.result as string;
        const newAsset: MediaAsset = {
          id: `media-${Date.now()}`,
          file_name: file.name,
          file_path: file.name,
          file_url: fileUrl,
          file_size: file.size,
          mime_type: file.type,
          category,
          created_at: new Date().toISOString(),
        };

        const existing = await this.getMediaAssets();
        existing.unshift(newAsset);
        localStorage.setItem(STORAGE_KEYS.MEDIA, JSON.stringify(existing));
        notifyContentChanged('media_assets');
        resolve(fileUrl);
      };
      reader.readAsDataURL(file);
    });
  },

  async deleteMediaAsset(id: string): Promise<void> {
    const all = await this.getMediaAssets();
    const filtered = all.filter((m) => m.id !== id);
    const supabase = getSupabaseClient();
    if (supabase) {
      await supabase.from('media_assets').delete().eq('id', id);
    }
    localStorage.setItem(STORAGE_KEYS.MEDIA, JSON.stringify(filtered));
    notifyContentChanged('media_assets');
  },

  // ENQUIRIES
  async getEnquiries(): Promise<EnquiryItem[]> {
    const supabase = getSupabaseClient();
    if (supabase) {
      const { data, error } = await supabase.from('enquiries').select('*').order('created_at', { ascending: false });
      if (!error && data) return data as EnquiryItem[];
    }
    const stored = localStorage.getItem(STORAGE_KEYS.ENQUIRIES);
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch (e) {}
    }
    return [];
  },

  async submitEnquiry(enquiry: Omit<EnquiryItem, 'id' | 'created_at' | 'status'>): Promise<EnquiryItem> {
    const item: EnquiryItem = {
      ...enquiry,
      id: `enq-${Date.now()}`,
      status: 'new',
      created_at: new Date().toISOString(),
    };
    const supabase = getSupabaseClient();
    if (supabase) {
      await supabase.from('enquiries').insert(item);
    }
    const all = await this.getEnquiries();
    all.unshift(item);
    localStorage.setItem(STORAGE_KEYS.ENQUIRIES, JSON.stringify(all));
    notifyContentChanged('enquiries');
    return item;
  },

  async resetToDefaults(): Promise<void> {
    localStorage.removeItem(STORAGE_KEYS.SETTINGS);
    localStorage.removeItem(STORAGE_KEYS.HERO);
    localStorage.removeItem(STORAGE_KEYS.COLLECTIONS);
    localStorage.removeItem(STORAGE_KEYS.FOUNDER);
    localStorage.removeItem(STORAGE_KEYS.FOUNDER_PICKS);
    localStorage.removeItem(STORAGE_KEYS.WHY_US);
    localStorage.removeItem(STORAGE_KEYS.EXPERIENCE);
    localStorage.removeItem(STORAGE_KEYS.TESTIMONIALS);
    localStorage.removeItem(STORAGE_KEYS.JOURNAL);
    localStorage.removeItem(STORAGE_KEYS.MEDIA);
    notifyContentChanged();
  },
};
