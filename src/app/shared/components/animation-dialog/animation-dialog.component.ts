import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-animation-dialog',
  templateUrl: './animation-dialog.component.html',
  styleUrl: './animation-dialog.component.scss',
})
export class AnimationDialogComponent {
  constructor(public dialogRef: MatDialogRef<AnimationDialogComponent>) {}

  onConfirm(result: boolean): void {
    this.dialogRef.close(result);
  }
}
