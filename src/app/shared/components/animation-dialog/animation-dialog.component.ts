import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose } from '@angular/material/dialog';
import { WarnMessage } from '../../../courses/models/warnMessage';
import { MatButtonModule } from '@angular/material/button';

@Component({
    selector: 'app-animation-dialog',
    templateUrl: './animation-dialog.component.html',
    styleUrl: './animation-dialog.component.scss',
    standalone: true,
    imports: [
        MatDialogTitle,
        MatDialogContent,
        MatDialogActions,
        MatButtonModule,
        MatDialogClose,
    ],
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
