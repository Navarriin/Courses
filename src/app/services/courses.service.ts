import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Course } from '../courses/models/course';

@Injectable({
  providedIn: 'root',
})
export class CoursesService {
  constructor(private htpp: HttpClient) {}

  listAll(): Course[] {
    return [
      {
        _id: '1',
        name: 'Angular',
        category: 'Front-end',
      },
      {
        _id: '2',
        name: 'React',
        category: 'Front-end',
      },
    ];
  }
}
