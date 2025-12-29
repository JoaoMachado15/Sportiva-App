import Chart from 'chart.js/auto';
import { Activity, SportType } from '../models/activity.model';

export function buildSportChart(
  canvas: HTMLCanvasElement,
  activities: Activity[],
  sportLabels: Record<SportType, string>,
  existingChart?: Chart
): Chart {
  if (existingChart) {
    existingChart.destroy();
  }

  const counts: Record<string, number> = {};

  activities.forEach(a => {
    counts[a.sport] = (counts[a.sport] || 0) + 1;
  });

  const labels = Object.keys(counts).map(
    s => sportLabels[s as SportType]
  );

  const data = Object.values(counts);

  return new Chart(canvas, {
    type: 'doughnut',
    data: {
      labels,
      datasets: [
        {
          data,
          backgroundColor: [
            '#3b82f6',
            '#22c55e',
            '#f97316',
            '#a855f7',
            '#ef4444',
            '#14b8a6',
          ],
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'bottom',
        },
      },
    },
  });
}
