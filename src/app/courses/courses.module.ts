import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import { CoursesComponent } from './courses/courses.component';
import { AppMaterialModule } from '../shared/app-material/app-material.module';
import { PagesRoutingModule } from './courses-routing.module';

@NgModule({
  declarations: [CoursesComponent],
  imports: [CommonModule, PagesRoutingModule, AppMaterialModule, SharedModule],
})
export class CoursesModule {}
