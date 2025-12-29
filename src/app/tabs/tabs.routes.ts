import { Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

export const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'dashboard',
        loadComponent: () =>
          import('../dashboard/dashboard.page')
            .then(m => m.DashboardPage),
      },
      {
        path: 'activities',
        loadComponent: () =>
          import('../activities/activities.page')
            .then(m => m.ActivitiesPage),
      },
      {
        path: 'activity/:id',
        loadComponent: () =>
          import('../activity-details/activity-details.page')
            .then(m => m.ActivityDetailsPage),
      },
      {
        path: 'statistics',
        loadComponent: () =>
          import('../statistics/statistics.page')
            .then(m => m.StatisticsPage),
      },
      {
        path: 'settings',
        loadComponent: () =>
          import('../settings/settings.page')
            .then(m => m.SettingsPage),
      },
      {
        path: '',
        redirectTo: '/tabs/dashboard',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: '/tabs/dashboard',
    pathMatch: 'full',
  },
];
