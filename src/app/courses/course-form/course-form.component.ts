import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CoursesService } from '../../services/courses.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrl: './course-form.component.scss',
})
export class CourseFormComponent {
  form: FormGroup;

  constructor(
    private location: Location,
    private snackBar: MatSnackBar,
    private formBuilder: FormBuilder,
    private coursesService: CoursesService
  ) {
    this.form = this.formBuilder.group({
      name: [null, [Validators.required, Validators.maxLength(150)]],
      category: [null, Validators.required],
    });
  }

  onSubmit(): void {
    // If para validação de form(de acordo com o formBuilder acima)
    if (this.form.valid) {
      this.coursesService.saveCourse(this.form.value).subscribe({
        // Usando a {} com next e error para tratamento correto
        next: () => this.onSuccess(),
        error: () => this.onError(),
      });
    } else {
      this.form.markAllAsTouched();
      this.form.updateValueAndValidity();
    }
  }

  onCancel(): void {
    this.form.reset();
    this.location.back();
  }

  private onSuccess(): void {
    this.snackBar.open('Curso criado com sucesso!', '', { duration: 3000 });
    this.onCancel();
  }

  private onError(): void {
    this.snackBar.open('Erro ao enviar dados!!', '', { duration: 3000 });
  }
}
