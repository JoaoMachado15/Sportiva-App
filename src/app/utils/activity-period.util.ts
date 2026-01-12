import { Activity } from '../models/activity.model';

export function filterActivitiesByPeriod(
  activities: Activity[],
  period: 'week' | 'month'
): Activity[] {
  const now = new Date();

  return activities.filter(activity => {
    const date = new Date(activity.date);

    // ===== WEEK (ISO: Monday → Sunday) =====
    if (period === 'week') {
      const startOfWeek = new Date(now);
      const day = startOfWeek.getDay() || 7; // domingo = 7
      startOfWeek.setDate(startOfWeek.getDate() - day + 1);
      startOfWeek.setHours(0, 0, 0, 0);

      const endOfWeek = new Date(startOfWeek);
      endOfWeek.setDate(startOfWeek.getDate() + 6);
      endOfWeek.setHours(23, 59, 59, 999);

      return date >= startOfWeek && date <= endOfWeek;
    }

    // ===== MONTH =====
    if (period === 'month') {
      return (
        date.getMonth() === now.getMonth() &&
        date.getFullYear() === now.getFullYear()
      );
    }

    return true;
  });
}
