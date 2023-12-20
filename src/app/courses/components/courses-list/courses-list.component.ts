import { Course } from '../../models/course';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrl: './courses-list.component.scss',
})
export class CoursesListComponent {
  @Input() courses: Course[] = [];
  @Output() add = new EventEmitter(false);
  readonly displayedColumns: string[] = ['name', 'category', 'action'];

  // Apenas emite o valor para o componente pai
  onAdd(): void {
    this.add.emit(true);
  }
}
