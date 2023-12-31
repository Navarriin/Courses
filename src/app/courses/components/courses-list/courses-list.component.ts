import { Course } from '../../models/course';
import { CategoryPipe } from '../../../shared/pipes/category.pipe';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { FormUtilsService } from '../../../services/utils/utils.service';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrl: './courses-list.component.scss',
  standalone: true,
  imports: [MatTableModule, MatIconModule, MatButtonModule, CategoryPipe],
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

  openData(element: Course) {
    this.formUtils.openContent(element);
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
