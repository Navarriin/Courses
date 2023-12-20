import { Course } from '../models/course';
import { MatDialog } from '@angular/material/dialog';
import { Component } from '@angular/core';
import { CoursesService } from '../../services/courses.service';
import { ErrorDialogComponent } from '../../shared/components/error-dialog/error-dialog.component';
import { Observable, catchError, of } from 'rxjs';
// import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.scss',
})
export class CoursesComponent {
  courses$: Observable<Course[]>;
  displayedColumns: string[] = ['name', 'category', 'action'];

  constructor(
    // private router: Router => mesma funçao que o "routerlink="""
    // private route: ActivatedRoute => pega o path da rota que esta no momento
    public dialog: MatDialog,
    private coursesService: CoursesService
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

  /* faz a mesma coisa que o routerlink=""
  onAdd(): void {
    this.router.navigate(['new'], { relativeTo: this.route });
  }*/
}
