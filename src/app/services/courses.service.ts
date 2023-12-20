import { Course } from '../courses/models/course';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, delay, first } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CoursesService {
  private readonly urlCourses: string = 'api/courses';

  constructor(private http: HttpClient) {}

  // pipe = (cano), parecido com map.
  // tap((courses) => console.log(courses))
  // take(1) => Para após uma chamada, se desinscrever.
  // first() => faz uma so vez(mesma coisa que o take(1))
  // delay(15000), Serve para dar um delay antes de pegar os dados (setTimeout)

  listAll(): Observable<Course[]> {
    return this.http.get<Course[]>(this.urlCourses).pipe(first(), delay(300));
  }

  saveCourse(body: Partial<Course>): Observable<Course> {
    return this.http.post<Course>(this.urlCourses, body).pipe(first());
  }
}
