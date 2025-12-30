import { Activity } from '../models/activity.model';

/* ---------- TYPES ---------- */

export type ActivityFilter = 'all' | 'favorites' | 'sport';

export type ActivitySort =
  | 'date-desc'
  | 'date-asc'
  | 'intensity'
  | 'duration';

/* ---------- FILTER ---------- */

export function filterActivities(
  activities: Activity[],
  filter: ActivityFilter,
  selectedSport?: string
): Activity[] {
  let result = [...activities];

  if (filter === 'favorites') {
    result = result.filter(a => a.favorite);
  }

  if (filter === 'sport' && selectedSport) {
    result = result.filter(a => a.sport === selectedSport);
  }

  return result;
}

/* ---------- SORT ---------- */

export function sortActivities(
  activities: Activity[],
  sort: ActivitySort
): Activity[] {
  return [...activities].sort((a, b) => {
    switch (sort) {
      case 'date-desc':
        return new Date(b.date).getTime() - new Date(a.date).getTime();

      case 'date-asc':
        return new Date(a.date).getTime() - new Date(b.date).getTime();

      case 'duration':
        return b.duration - a.duration;

      case 'intensity': {
        const weight = { low: 1, moderate: 2, high: 3 };
        return weight[b.intensity] - weight[a.intensity];
      }

      default:
        return 0;
    }
  });
}
