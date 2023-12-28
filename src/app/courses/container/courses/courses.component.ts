import { Course } from '../../models/course';
import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CoursesService } from '../../../services/courses/courses.service';
import { ErrorDialogComponent } from '../../../shared/components/error-dialog/error-dialog.component';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, catchError, of, tap } from 'rxjs';
import { CoursePage } from '../../models/course-page';
import { MatPaginator, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.scss',
})
export class CoursesComponent {
  courses$: Observable<CoursePage> | null = null;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  pageIndex: number = 0;
  pageSize: number = 10;

  constructor(
    private router: Router, // => mesma funçao que o "routerlink="""
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute, // => pega o path da rota que esta no momento
    private coursesService: CoursesService
  ) {
    this.loadingCourses();
  }

  loadingCourses(
    pageEvent: PageEvent = { length: 0, pageIndex: 0, pageSize: 10 }
  ) {
    this.courses$ = this.coursesService
      .listAll(pageEvent.pageIndex, pageEvent.pageSize)
      .pipe(
        tap(() => {
          this.pageIndex = pageEvent.pageIndex;
          this.pageSize = pageEvent.pageSize;
        }),
        catchError(() => {
          // cathError espera um return de observable do erro
          this.onError('Erro ao Carregar dados');
          return of({ courses: [], totalElements: 0, totalPages: 0 }); // of tambem é um metodo do rxjs
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

  onDelete(body: Course): void {
    this.coursesService.deleteCourse(body._id).subscribe({
      next: () => {
        this.loadingCourses();
        this.snackBarMessage();
      },
      error: () => this.onError('Erro ao deletar curso!'),
    });
  }

  snackBarMessage(): void {
    this.snackBar.open('Curso deletado com sucesso!!', 'X', {
      duration: 5000,
      verticalPosition: 'top',
      horizontalPosition: 'center',
    });
  }
}
