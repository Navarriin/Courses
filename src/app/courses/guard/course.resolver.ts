import { of } from 'rxjs';
import { inject } from '@angular/core';
import { Course } from '../models/course';
import { ResolveFn } from '@angular/router';
import { CoursesService } from '../../services/courses.service';

export const courseResolver: ResolveFn<Course> = (
  route,
  state,
  service: CoursesService = inject(CoursesService) // Injetando o nosso service
) => {
  if (route.params?.['id']) {
    return service.getById(route.params?.['id']); // Se a rota tem parametro, retorna o parametro
  } else {
    return of({ _id: '', name: '', category: '' }); // se a tora nao tem parametro, retorna objeto de Course vazio
  }
};
