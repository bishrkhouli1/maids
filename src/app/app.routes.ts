import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./users/users-list/users-list.component').then(
        (c) => c.UsersListComponent
      ),
  },
  {
    path: ':id',
    loadComponent: () =>
      import('./users/users-details/users-details.component').then(
        (c) => c.UsersDetailsComponent
      ),
  },
];
