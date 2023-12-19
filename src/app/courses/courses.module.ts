import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import { CoursesComponent } from './courses/courses.component';
import { AppMaterialModule } from '../shared/app-material/app-material.module';
import { PagesRoutingModule } from './courses-routing.module';
import { CourseFormComponent } from './course-form/course-form.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [CoursesComponent, CourseFormComponent],
  imports: [
    SharedModule,
    CommonModule,
    AppMaterialModule,
    PagesRoutingModule,
    ReactiveFormsModule,
  ],
})
export class CoursesModule {}
