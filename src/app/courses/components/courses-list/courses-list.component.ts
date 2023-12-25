import { Course } from '../../models/course';
import { MatDialog } from '@angular/material/dialog';
import { AnimationDialogComponent } from '../../../shared/components/animation-dialog/animation-dialog.component';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormUtilsService } from '../../../services/utils/utils.service';

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

  constructor(public formUtils: FormUtilsService) {}

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
    const dialog = this.formUtils.openDialog(
      'Deseja deletar o curso?',
      'O curso será deletado permanentemente!'
    );
    dialog.subscribe((result: boolean) => {
      if (result) {
        this.onDelete(body);
      }
    });
  }
}
