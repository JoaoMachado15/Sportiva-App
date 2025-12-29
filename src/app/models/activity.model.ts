export type ActivityIntensity = 'low' | 'moderate' | 'high';

export type SportType =
  | 'running'
  | 'cycling'
  | 'gym'
  | 'football'
  | 'swimming'
  | 'basketball'
  | 'tennis'
  | 'yoga'
  | 'hiking'
  | 'crossfit';


export interface Activity {
  id: string;
  sport: SportType;
  duration: number;
  date: string;
  location: string;
  intensity: ActivityIntensity;
  notes?: string;
  favorite: boolean;
}
