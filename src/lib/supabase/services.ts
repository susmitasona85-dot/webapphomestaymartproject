import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// If credentials are missing, we'll handle it gracefully in the services
export const supabase = (supabaseUrl && supabaseAnonKey)
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

/**
 * Service to handle data fetching, falling back to mock data if Supabase is not configured
 */
import { STAYS, EXPERIENCES, REVIEWS } from '@/data/mockData';
import { Stay, Experience, Review, Availability } from '@/types';
import { addDays, format } from 'date-fns';

// In-memory mock state for availability during current session (simulates DB)
const MOCK_AVAILABILITY: Availability[] = [
  { stayId: '1', date: format(addDays(new Date(), 2), 'yyyy-MM-dd'), isAvailable: false },
  { stayId: '1', date: format(addDays(new Date(), 3), 'yyyy-MM-dd'), isAvailable: false },
  { stayId: '2', date: format(addDays(new Date(), 7), 'yyyy-MM-dd'), isAvailable: false },
  { stayId: '2', date: format(addDays(new Date(), 8), 'yyyy-MM-dd'), isAvailable: false },
];

export const getStays = async (): Promise<Stay[]> => {
  if (!supabase) return STAYS;

  const { data, error } = await supabase.from('stays').select('*');
  if (error || !data) return STAYS;
  return data as Stay[];
};

export const getStayById = async (id: string): Promise<Stay | undefined> => {
  if (!supabase) return STAYS.find(s => s.id === id);

  const { data, error } = await supabase.from('stays').select('*').eq('id', id).single();
  if (error || !data) return STAYS.find(s => s.id === id);
  return data as Stay;
};

export const getExperiences = async (): Promise<Experience[]> => {
  if (!supabase) return EXPERIENCES;

  const { data, error } = await supabase.from('experiences').select('*');
  if (error || !data) return EXPERIENCES;
  return data as Experience[];
};

export const getReviews = async (): Promise<Review[]> => {
  if (!supabase) return REVIEWS;

  const { data, error } = await supabase.from('reviews').select('*').order('date', { ascending: false });
  if (error || !data) return REVIEWS;
  return data as Review[];
};

// Mock availability logic
export const getAvailability = async (stayId: string, startDate: Date, endDate: Date): Promise<Availability[]> => {
  if (!supabase) {
    return MOCK_AVAILABILITY.filter(a => a.stayId === stayId);
  }

  const { data, error } = await supabase
    .from('availability')
    .select('*')
    .eq('stayId', stayId)
    .gte('date', format(startDate, 'yyyy-MM-dd'))
    .lte('date', format(endDate, 'yyyy-MM-dd'));

  if (error || !data) return [];
  return data as Availability[];
};

export const updateAvailability = async (stayId: string, date: string, isAvailable: boolean): Promise<boolean> => {
  if (!supabase) {
    const existingIndex = MOCK_AVAILABILITY.findIndex(a => a.stayId === stayId && a.date === date);
    if (existingIndex > -1) {
      if (isAvailable) {
        // Remove from blocked list
        MOCK_AVAILABILITY.splice(existingIndex, 1);
      } else {
        // Already blocked
      }
    } else {
      if (!isAvailable) {
        // Add to blocked list
        MOCK_AVAILABILITY.push({ stayId, date, isAvailable });
      }
    }
    return true;
  }

  const { error } = await supabase
    .from('availability')
    .upsert({ stayId, date, isAvailable }, { onConflict: 'stayId,date' });

  return !error;
};
