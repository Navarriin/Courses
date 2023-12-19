import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Course } from '../courses/models/course';
import { Observable, first, take, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CoursesService {
  private readonly urlCourses = 'assets/courses.json';

  constructor(private htpp: HttpClient) {}

  listAll(): Observable<Course[]> {
    return this.htpp.get<Course[]>(this.urlCourses).pipe(
      // pipe = (cano), parecido com map.
      // take(1) => Para após uma chamada, se desinscrever.
      first(), // Para fazer uma só vez.
      tap((courses) => console.log(courses))
    );
  }
}
