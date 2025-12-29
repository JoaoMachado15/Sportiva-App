import { Activity } from '../models/activity.model';

export function getTotalActivities(activities: Activity[]): number {
  return activities.length;
}

export function getTotalFavorites(activities: Activity[]): number {
  return activities.filter(a => a.favorite).length;
}

export function getTotalMinutes(activities: Activity[]): number {
  return activities.reduce((sum, a) => sum + a.duration, 0);
}

export function getAverageMinutes(activities: Activity[]): number {
  if (!activities.length) return 0;
  return Math.round(getTotalMinutes(activities) / activities.length);
}
