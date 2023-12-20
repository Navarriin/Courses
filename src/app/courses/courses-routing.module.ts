import { NgModule } from '@angular/core';
import { CoursesComponent } from './container/courses/courses.component';
import { RouterModule, Routes } from '@angular/router';
import { CourseFormComponent } from './container/course-form/course-form.component';
import { courseResolver } from './guard/course.resolver';

const routes: Routes = [
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

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
