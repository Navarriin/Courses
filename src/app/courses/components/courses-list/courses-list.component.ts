import { Course } from '../../models/course';
import { MatDialog } from '@angular/material/dialog';
import { AnimationDialogComponent } from '../../../shared/components/animation-dialog/animation-dialog.component';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrl: './courses-list.component.scss',
})
export class CoursesListComponent {
  readonly displayedColumns: string[] = ['name', 'category', 'action'];

  @Input() courses: Course[] = [];
  @Output() add = new EventEmitter(false);
  @Output() edit = new EventEmitter(false);
  @Output() delete = new EventEmitter(false);

  constructor(public dialog: MatDialog) {}

  onAdd(): void {
    this.add.emit(true);
  }

  onEdit(body: Course): void {
    this.edit.emit(body);
  }

  onDelete(body: Course): void {
    this.delete.emit(body);
  }

  openDialog(body: Course): void {
    const dialogRef = this.dialog.open(AnimationDialogComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if (result) this.onDelete(body);
    });
  }
}
