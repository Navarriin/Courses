import { Course } from '../models/course';
import { MatDialog } from '@angular/material/dialog';
import { Component } from '@angular/core';
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
  displayedColumns: string[] = ['name', 'category'];

  constructor(
    private coursesService: CoursesService,
    public dialog: MatDialog
  ) {
    this.courses$ = this.coursesService.listAll().pipe(
      catchError((error) => {
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
}
