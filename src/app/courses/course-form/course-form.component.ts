import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CoursesService } from '../../services/courses.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrl: './course-form.component.scss',
})
export class CourseFormComponent {
  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private coursesService: CoursesService,
    private snackBar: MatSnackBar
  ) {
    this.form = this.formBuilder.group({
      name: [null],
      category: [null],
    });
  }

  onSubmit(): void {
    // If para validação de form(de acordo com o formBuilder acima)
    if (this.form.valid) {
      this.coursesService.saveCourse(this.form.value).subscribe({
        // Usando a {} com next e error para tratamento correto
        next: (data) => console.log(data),
        error: () => this.onError(),
      });
    }
  }

  private onError(): void {
    this.snackBar.open('Erro ao enviar dados!!', '', { duration: 3000 });
  }
}
