import { Course } from '../../courses/models/course';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CoursePage } from '../../courses/models/course-page';
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

  listAll(pageNumber = 0, pageSize = 10): Observable<CoursePage> {
    return this.http
      .get<CoursePage>(this.urlCourses, { params: { pageNumber, pageSize } })
      .pipe(first(), delay(150));
  }

  getById(id: string): Observable<Course> {
    return this.http.get<Course>(`${this.urlCourses}/${id}`).pipe(first());
  }

  sendData(body: Partial<Course>): Observable<Course> {
    if (body._id) {
      return this.editCourse(body);
    }
    return this.saveCourse(body);
  }

  private saveCourse(body: Partial<Course>): Observable<Course> {
    return this.http.post<Course>(this.urlCourses, body).pipe(first());
  }

  private editCourse(body: Partial<Course>): Observable<Course> {
    return this.http
      .put<Course>(`${this.urlCourses}/${body._id}`, body)
      .pipe(first());
  }

  deleteCourse(id: string): Observable<void> {
    return this.http.delete<void>(`${this.urlCourses}/${id}`).pipe(first());
  }
}
