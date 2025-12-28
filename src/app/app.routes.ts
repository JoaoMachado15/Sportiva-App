import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.routes').then((m) => m.routes),
  },
   {
    path: 'add-activity',
    loadComponent: () => import('./add-activity/add-activity.page').then( m => m.AddActivityPage)
  },
  {
  path: 'edit-activity/:id',
  loadComponent: () =>
    import('./add-activity/add-activity.page')
      .then(m => m.AddActivityPage),
}


];
