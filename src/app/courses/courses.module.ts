import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import { CoursesComponent } from './container/courses/courses.component';
import { AppMaterialModule } from '../shared/app-material/app-material.module';
import { PagesRoutingModule } from './courses-routing.module';
import { CourseFormComponent } from './container/course-form/course-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CoursesListComponent } from './components/courses-list/courses-list.component';

@NgModule({
    imports: [
        SharedModule,
        CommonModule,
        AppMaterialModule,
        PagesRoutingModule,
        ReactiveFormsModule,
        CoursesComponent, CourseFormComponent, CoursesListComponent,
    ],
})
export class CoursesModule {}
