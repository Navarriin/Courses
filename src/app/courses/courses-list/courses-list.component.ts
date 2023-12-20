import { Course } from '../models/course';
import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrl: './courses-list.component.scss',
})
export class CoursesListComponent {
  @Input() courses: Course[] = [];
  readonly displayedColumns: string[] = ['name', 'category', 'action'];

  constructor(
    private router: Router, // => mesma funçao que o "routerlink="""
    private route: ActivatedRoute // => pega o path da rota que esta no momento
  ) {}

  // faz a mesma coisa que o routerlink=""
  onAdd(): void {
    this.router.navigate(['new'], { relativeTo: this.route });
  }
}
