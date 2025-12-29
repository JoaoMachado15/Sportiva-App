import { Activity } from '../models/activity.model';

export type ActivityFilter = 'all' | 'favorites';

export function filterActivities(
  activities: Activity[],
  filter: ActivityFilter
): Activity[] {
  if (filter === 'favorites') {
    return activities.filter(a => a.favorite);
  }
  return activities;
}
