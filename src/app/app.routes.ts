import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: 'sign-in',
    loadComponent: () =>
      import('./pages/sign-in/sign-in.page').then((m) => m.SignInPage),
  },
  {
    path: 'sign-up',
    loadComponent: () =>
      import('./pages/sign-up/sign-up.page').then((m) => m.SignUpPage),
  },
  {
    path: 'welcome',
    loadComponent: () =>
      import('./pages/welcome/welcome.page').then((m) => m.WelcomePage),
  },
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./pages/dashboard/dashboard.page').then((m) => m.DashboardPage),

    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
      {
        path: 'home',
        loadComponent: () =>
          import('./pages/home/home.page').then((m) => m.HomePage),
      },
      {
        path: 'user-profile',
        loadComponent: () =>
          import('./pages/user-profile/user-profile.page').then(
            (m) => m.UserProfilePage
          ),
      },
    ],
  },
  {
    path: 'new-request',
    loadComponent: () => import('./pages/new-request/new-request.page').then( m => m.NewRequestPage)
  },
];
