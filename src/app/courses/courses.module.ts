import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { CoursesComponent } from './container/courses/courses.component';

import { PagesRoutingModule } from './courses-routing.module';
import { CourseFormComponent } from './container/course-form/course-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CoursesListComponent } from './components/courses-list/courses-list.component';

@NgModule({
    imports: [
    CommonModule,
    PagesRoutingModule,
    ReactiveFormsModule,
    CoursesComponent, CourseFormComponent, CoursesListComponent,
],
})
export class CoursesModule {}
