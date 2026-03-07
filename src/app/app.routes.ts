import { Routes } from '@angular/router';
import { MainLayout } from './layout/main-layout/main-layout.component';
import { rbacGuard } from './core/guards/rbac-guard';

export const routes: Routes = [
  {
    path: '',
    component: MainLayout,
    children: [
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./features/dashboard/dashboard.component').then((m) => m.DashboardComponent),
        canActivate: [rbacGuard],
        data: {
          roles: ['admin', 'manager'], // allowed roles
        },
      },
         {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
      {
        path: '**',
        redirectTo: 'dashboard',
      },
    ],
  },
];
