import { Course } from '../../models/course';
import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { CoursesService } from '../../../services/courses.service';
import { FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { Lesson } from '../../models/lesson';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrl: './course-form.component.scss',
})
export class CourseFormComponent {
  form!: FormGroup;

  constructor(
    private location: Location,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private coursesService: CoursesService,
    private formBuilder: NonNullableFormBuilder
  ) {}

  ngOnInit(): void {
    const course: Course = this.route.snapshot.data['course']; // Pegando os parametros da url de acordo com o Resolver criado

    this.form = this.formBuilder.group({
      _id: [course._id],
      name: [course.name, [Validators.required, Validators.maxLength(150)]],
      category: [course.category, Validators.required],
      lessons: this.formBuilder.array(this.retrieveLessons(course)),
    });
  }

  private retrieveLessons(course: Course) {
    const lessons = [];

    if (course?.lessons) {
      course.lessons.forEach((lesson) =>
        lessons.push(this.createLesson(lesson))
      );
    } else {
      lessons.push(this.createLesson());
    }
    return lessons;
  }

  private createLesson(lesson: Lesson = { id: '', name: '', youtubeUrl: '' }) {
    return this.formBuilder.group({
      id: [lesson.id],
      name: [lesson.name],
      youtubeUrl: [lesson.youtubeUrl],
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.coursesService.sendData(this.form.value).subscribe({
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
    this.location.back(); // Voltando para pagina anterior
  }

  getErrorMessage(fieldName: string) {
    const field = this.form.get(fieldName);

    if (field?.hasError('required')) {
      return 'Campo obrigatório';
    }

    if (field?.hasError('maxlength')) {
      return 'Limite de caracteres excedido';
    }
    return 'Campo inválido';
  }

  private onSuccess(): void {
    let message!: string;

    if (this.form.value._id) {
      message = 'Curso editado com sucesso!';
    } else {
      message = 'Curso criado com sucesso!';
    }

    this.snackBar.open(`${message}`, 'X', { duration: 3000 });
    setTimeout(() => this.onCancel(), 300);
  }

  private onError(): void {
    this.snackBar.open('Erro ao enviar dados!!', 'X', { duration: 3000 });
  }
}
