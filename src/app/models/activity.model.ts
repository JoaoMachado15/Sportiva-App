export type ActivityIntensity = 'low' | 'moderate' | 'high';

export interface Activity {
  id: string;
  sport: string;
  duration: number;
  date: string;
  location: string;
  intensity: ActivityIntensity;
  notes?: string;
  favorite: boolean;
}
