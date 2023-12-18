import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './courses-routing.module';
import { CoursesComponent } from './courses/courses.component';

@NgModule({
  declarations: [CoursesComponent],
  imports: [CommonModule, PagesRoutingModule],
})
export class CoursesModule {}
