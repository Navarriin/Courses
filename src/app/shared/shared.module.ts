import { NgModule } from '@angular/core';
import { CategoryPipe } from './pipes/category.pipe';
import { CommonModule } from '@angular/common';
import { AppMaterialModule } from './app-material/app-material.module';
import { ErrorDialogComponent } from './components/error-dialog/error-dialog.component';

@NgModule({
  declarations: [ErrorDialogComponent, CategoryPipe],
  imports: [CommonModule, AppMaterialModule],
  exports: [ErrorDialogComponent, CategoryPipe],
})
export class SharedModule {}
