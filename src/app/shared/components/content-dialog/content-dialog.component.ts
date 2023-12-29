import { Course } from '../../../courses/models/course';
import { MatButtonModule } from '@angular/material/button';
import { Component, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { Lesson } from '../../../courses/models/lesson';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-content-dialog',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, MatIconModule],
  templateUrl: './content-dialog.component.html',
  styleUrl: './content-dialog.component.scss',
})
export class ContentDialogComponent {
  lessons!: Lesson[];
  constructor(
    public dialogRef: MatDialogRef<ContentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Course
  ) {
    this.lessons = data.lesson;
  }
}
