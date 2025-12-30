import { Activity } from '../models/activity.model';

export function filterActivitiesByPeriod(
  activities: Activity[],
  period: 'week' | 'month'
): Activity[] {
  const now = new Date();

  return activities.filter(activity => {
    const date = new Date(activity.date);

    if (period === 'week') {
      const startOfWeek = new Date(now);
      startOfWeek.setDate(now.getDate() - now.getDay());
      startOfWeek.setHours(0, 0, 0, 0);
      return date >= startOfWeek;
    }

    if (period === 'month') {
      return (
        date.getMonth() === now.getMonth() &&
        date.getFullYear() === now.getFullYear()
      );
    }

    return true;
  });
}
