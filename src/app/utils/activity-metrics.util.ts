import { Activity } from '../models/activity.model';

export function getTotalMinutes(activities: Activity[]): number {
  return activities.reduce((sum, a) => sum + a.duration, 0);
}

export function getTotalFavorites(activities: Activity[]): number {
  return activities.filter(a => a.favorite).length;
}
