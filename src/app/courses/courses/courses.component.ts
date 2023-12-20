import { Course } from '../models/course';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CoursesService } from '../../services/courses.service';
import { ErrorDialogComponent } from '../../shared/components/error-dialog/error-dialog.component';
import { Observable, catchError, of } from 'rxjs';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.scss',
})
export class CoursesComponent {
  courses$: Observable<Course[]>;

  constructor(
    public dialog: MatDialog,
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
  ngOnInit(): void {}

  // faz a mesma coisa que o routerlink=""
  // onAdd(): void {
  //   this.router.navigate(['new'], { relativeTo: this.route });
  // }
}
