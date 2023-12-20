import { Course } from '../courses/models/course';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, first } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CoursesService {
  private readonly urlCourses: string = 'api/courses';

  constructor(private http: HttpClient) {}

  listAll(): Observable<Course[]> {
    return this.http.get<Course[]>(this.urlCourses).pipe(
      first() // Para fazer uma só vez.
      // pipe = (cano), parecido com map.
      // take(1) => Para após uma chamada, se desinscrever.
      // delay(15000), Serve para dar um delay antes de pegar os dados (setTimeout)
      // tap((courses) => console.log(courses))
    );
  }

  saveCourse(body: Course): Observable<Course> {
    return this.http.post<Course>(this.urlCourses, body).pipe(first());
  }
}
