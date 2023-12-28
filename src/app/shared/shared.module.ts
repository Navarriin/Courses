import { NgModule } from '@angular/core';
import { CategoryPipe } from './pipes/category.pipe';
import { CommonModule } from '@angular/common';
import { AppMaterialModule } from './app-material/app-material.module';
import { ErrorDialogComponent } from './components/error-dialog/error-dialog.component';
import { AnimationDialogComponent } from './components/animation-dialog/animation-dialog.component';

@NgModule({
    imports: [CommonModule, AppMaterialModule, ErrorDialogComponent, CategoryPipe, AnimationDialogComponent],
    exports: [ErrorDialogComponent, CategoryPipe, AnimationDialogComponent],
})
export class SharedModule {}
