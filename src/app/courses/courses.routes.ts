import { Routes } from '@angular/router';
import { courseResolver } from './guard/course.resolver';
import { CoursesComponent } from './container/courses/courses.component';
import { CourseFormComponent } from './container/course-form/course-form.component';

export const COURSES_ROUTES: Routes = [
  { path: '', component: CoursesComponent },
  {
    path: 'new',
    component: CourseFormComponent,
    resolve: { course: courseResolver },
  },
  {
    path: 'edit/:id',
    component: CourseFormComponent,
    resolve: { course: courseResolver },
  },
];
