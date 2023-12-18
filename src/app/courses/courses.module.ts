import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './courses-routing.module';
import { CoursesComponent } from './courses/courses.component';
import { AppMaterialModule } from '../shareds/app-material/app-material.module';

@NgModule({
  declarations: [CoursesComponent],
  imports: [CommonModule, PagesRoutingModule, AppMaterialModule],
})
export class CoursesModule {}
