import { NgModule } from '@angular/core';

import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  exports: [
    MatCardModule,
    MatIconModule,
    MatTableModule,
    MatDialogModule,
    MatButtonModule,
    MatToolbarModule,
    MatProgressSpinnerModule,
  ],
})
export class AppMaterialModule {}
