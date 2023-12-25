import { Lesson } from '../../models/lesson';
import { Course } from '../../models/course';
import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { CoursesService } from '../../../services/courses/courses.service';
import {
  FormGroup,
  NonNullableFormBuilder,
  UntypedFormArray,
  Validators,
} from '@angular/forms';
import { FormUtilsService } from '../../../services/utils/utils.service';

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
    public formUtils: FormUtilsService,
    private coursesService: CoursesService,
    private formBuilder: NonNullableFormBuilder
  ) {}

  ngOnInit(): void {
    const course: Course = this.route.snapshot.data['course']; // Pegando os parametros da url de acordo com o Resolver criado

    this.form = this.formBuilder.group({
      _id: [course._id],
      name: [course.name, [Validators.required, Validators.maxLength(150)]],
      category: [course.category, Validators.required],
      lesson: this.formBuilder.array(
        this.retrieveLessons(course),
        Validators.required
      ),
    });
  }

  private retrieveLessons(course: Course) {
    const lessons = [];

    if (course?.lesson) {
      course.lesson.forEach((lesson) =>
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
      name: [lesson.name, [Validators.required, Validators.maxLength(100)]],
      youtubeUrl: [
        lesson.youtubeUrl,
        [Validators.required, Validators.maxLength(20)],
      ],
    });
  }

  getLessonsFormArray() {
    return (<UntypedFormArray>this.form.get('lesson')).controls;
  }

  addNewLesson(): void {
    const lesson = this.form.get('lesson') as UntypedFormArray;
    lesson.push(this.createLesson());
  }

  deleteLesson(index: number): void {
    const lesson = this.form.get('lesson') as UntypedFormArray;
    lesson.removeAt(index);
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.coursesService.sendData(this.form.value).subscribe({
        next: () => this.onSuccess(),
        error: () => this.onError(),
      });
    } else {
      this.formUtils.validateAllFormsFields(this.form);
    }
  }

  onCancel(): void {
    this.form.reset();
    this.location.back(); // Voltando para pagina anterior
  }

  openDialog(index: number): void {
    const dialog = this.formUtils.openDialog(
      'Deseja deletar a aula?',
      'A aula será deletada permanentemente!'
    );
    dialog.subscribe((result: boolean) => {
      if (result) {
        this.deleteLesson(index);
      }
    });
  }

  private onSuccess(): void {
    let message: string;

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
