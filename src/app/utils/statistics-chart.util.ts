import Chart from 'chart.js/auto';
import { Activity } from '../models/activity.model';
import { getMinutesBySport } from '../utils/activity-metrics.util';

export function buildSportTimeChart(
  canvas: HTMLCanvasElement,
  activities: Activity[],
  labels: Record<string, string>,
  existingChart?: Chart
): Chart {
  if (existingChart) existingChart.destroy();

  const dataMap = getMinutesBySport(activities);

  return new Chart(canvas, {
    type: 'bar',
    data: {
      labels: Object.keys(dataMap).map((k) => labels[k]),
      datasets: [
        {
          data: Object.values(dataMap),
          backgroundColor: '#22c55e',
          borderRadius: 6,
        },
      ],
    },
    options: {
      indexAxis: 'y',
      plugins: { legend: { display: false } },
    },
  });
}

export function buildActivitiesByMonthChart(
  canvas: HTMLCanvasElement,
  activities: Activity[],
  existingChart?: Chart
): Chart {
  if (existingChart) existingChart.destroy();

  const months: Record<string, number> = {};

  activities.forEach((a) => {
    const m = new Date(a.date).toLocaleString('default', { month: 'short' });
    months[m] = (months[m] || 0) + 1;
  });

  return new Chart(canvas, {
    type: 'bar',
    data: {
      labels: Object.keys(months),
      datasets: [
        {
          label: 'Activities',
          data: Object.values(months),
          backgroundColor: '#3b82f6',
        },
      ],
    },
  });
}
