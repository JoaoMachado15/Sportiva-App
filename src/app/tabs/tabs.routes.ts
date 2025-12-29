import { Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

export const routes: Routes = [
  {
    path: '',
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
        path: 'add-activity',
        loadComponent: () =>
          import('../add-activity/add-activity.page')
            .then(m => m.AddActivityPage),
      },
      {
        path: 'edit-activity/:id',
        loadComponent: () =>
          import('../add-activity/add-activity.page')
            .then(m => m.AddActivityPage),
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
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
    ],
  },
];
