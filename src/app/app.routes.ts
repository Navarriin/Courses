import { Routes } from '@angular/router';
import { ErrorPageComponent } from './courses/container/error-page/error-page.component';

export const APP_ROUTES: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'courses' },
  { path: 'error', component: ErrorPageComponent },
  {
    path: 'courses',
    loadChildren: () =>
      import('./courses/courses.routes').then(
        (module) => module.COURSES_ROUTES
      ),
  },
];
