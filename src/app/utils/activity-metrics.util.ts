import { Activity, SportType } from '../models/activity.model';

// TOTAL MINUTES
export function getTotalMinutes(activities: Activity[]): number {
  return activities.reduce((sum, a) => sum + a.duration, 0);
}

// TOTAL FAVORITES
export function getTotalFavorites(activities: Activity[]): number {
  return activities.filter((a) => a.favorite).length;
}

// TOTAL ACTIVITIES
export function getTotalActivities(activities: Activity[]): number {
  return activities.length;
}

// AVERAGE MINUTES PER ACTIVITY
export function getAverageMinutes(activities: Activity[]): number {
  if (!activities.length) return 0;
  return Math.round(getTotalMinutes(activities) / activities.length);
}

// MOST PRACTICED SPORT (POR Nº DE ATIVIDADES)
export function getMostPracticedSport(
  activities: Activity[]
): SportType | null {
  if (!activities.length) return null;

  const counter: Record<SportType, number> = {} as Record<SportType, number>;

  activities.forEach((activity) => {
    counter[activity.sport] = (counter[activity.sport] || 0) + 1;
  });

  let mostPracticed: SportType | null = null;
  let max = 0;

  for (const sport in counter) {
    if (counter[sport as SportType] > max) {
      max = counter[sport as SportType];
      mostPracticed = sport as SportType;
    }
  }

  return mostPracticed;
}

// minutos desta semana (segunda → domingo)
export function getWeeklyMinutes(
  activities: Activity[],
  referenceDate: Date = new Date()
): number {
  const startOfWeek = new Date(referenceDate);
  startOfWeek.setDate(referenceDate.getDate() - referenceDate.getDay() + 1);
  startOfWeek.setHours(0, 0, 0, 0);

  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(startOfWeek.getDate() + 6);
  endOfWeek.setHours(23, 59, 59, 999);

  return activities
    .filter((a) => {
      const d = new Date(a.date);
      return d >= startOfWeek && d <= endOfWeek;
    })
    .reduce((sum, a) => sum + a.duration, 0);
}

// minutos por modalidade
export function getMinutesBySport(
  activities: Activity[]
): Record<SportType, number> {
  return activities.reduce((acc, activity) => {
    acc[activity.sport] = (acc[activity.sport] || 0) + activity.duration;
    return acc;
  }, {} as Record<SportType, number>);
}
