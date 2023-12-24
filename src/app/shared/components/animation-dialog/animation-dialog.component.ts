import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { WarnMessage } from '../../../courses/models/warnMessage';

@Component({
  selector: 'app-animation-dialog',
  templateUrl: './animation-dialog.component.html',
  styleUrl: './animation-dialog.component.scss',
})
export class AnimationDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<AnimationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public message: WarnMessage
  ) {}

  onConfirm(result: boolean): void {
    this.dialogRef.close(result);
  }
}
