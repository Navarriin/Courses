import { Course } from '../../models/course';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CoursesService } from '../../../services/courses.service';
import { ErrorDialogComponent } from '../../../shared/components/error-dialog/error-dialog.component';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, catchError, of } from 'rxjs';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.scss',
})
export class CoursesComponent {
  courses$: Observable<Course[]>;

  constructor(
    private router: Router, // => mesma funçao que o "routerlink="""
    public dialog: MatDialog,
    private route: ActivatedRoute, // => pega o path da rota que esta no momento
    private coursesService: CoursesService
  ) {
    this.courses$ = this.coursesService.listAll().pipe(
      catchError(() => {
        // cathError espera um return de observable do erro
        this.onError('Erro ao Carregar dados');
        return of([]); // of tambem é um metodo do rxjs
      })
    );
  }

  onError(errorMsg: string) {
    this.dialog.open(ErrorDialogComponent, {
      data: errorMsg,
    });
  }

  // faz a mesma coisa que o routerlink=""
  onAdd(): void {
    this.router.navigate(['new'], { relativeTo: this.route });
  }

  onEdit(body: Course): void {
    this.router.navigate(['edit', body._id], { relativeTo: this.route });
  }
}
