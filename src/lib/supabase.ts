import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Configuration helper allowing both .env and browser-configured keys
export interface SupabaseConfig {
  url: string;
  anonKey: string;
}

export function getStoredSupabaseConfig(): SupabaseConfig {
  const envUrl = import.meta.env.VITE_SUPABASE_URL || '';
  const envKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

  if (envUrl && envKey) {
    return { url: envUrl, anonKey: envKey };
  }

  try {
    const stored = localStorage.getItem('goldnglow_supabase_config');
    if (stored) {
      const parsed = JSON.parse(stored);
      if (parsed.url && parsed.anonKey) {
        return parsed;
      }
    }
  } catch (e) {
    console.warn('Could not parse stored supabase config', e);
  }

  return { url: '', anonKey: '' };
}

export function saveSupabaseConfig(config: SupabaseConfig) {
  localStorage.setItem('goldnglow_supabase_config', JSON.stringify(config));
  // Invalidate client instance
  clientInstance = null;
}

let clientInstance: SupabaseClient | null = null;

export function getSupabaseClient(): SupabaseClient | null {
  if (clientInstance) return clientInstance;

  const config = getStoredSupabaseConfig();
  if (config.url && config.anonKey) {
    try {
      clientInstance = createClient(config.url, config.anonKey, {
        auth: {
          persistSession: true,
          autoRefreshToken: true,
        },
      });
      return clientInstance;
    } catch (err) {
      console.error('Failed to initialize Supabase client:', err);
      return null;
    }
  }
  return null;
}

export async function testSupabaseConnection(url: string, anonKey: string): Promise<{ success: boolean; message: string }> {
  try {
    const client = createClient(url, anonKey);
    const { error } = await client.from('site_settings').select('count', { count: 'exact', head: true });
    if (error && error.code !== 'PGRST116') {
      return { success: false, message: error.message };
    }
    return { success: true, message: 'Successfully connected to Supabase PostgreSQL database!' };
  } catch (e: any) {
    return { success: false, message: e?.message || 'Connection failed. Please check your credentials.' };
  }
}
