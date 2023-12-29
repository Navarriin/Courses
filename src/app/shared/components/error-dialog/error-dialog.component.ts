import { MatButtonModule } from '@angular/material/button';
import { Component, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';

@Component({
  selector: 'app-error-dialog',
  templateUrl: './error-dialog.component.html',
  styleUrl: './error-dialog.component.scss',
  standalone: true,
  imports: [
    MatDialogTitle,
    MatDialogClose,
    MatButtonModule,
    MatDialogContent,
    MatDialogActions,
  ],
})
export class ErrorDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public error: string
  ) {}
}
