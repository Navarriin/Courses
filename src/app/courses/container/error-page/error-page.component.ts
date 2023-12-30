import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-error-page',
  standalone: true,
  imports: [],
  templateUrl: './error-page.component.html',
  styleUrl: './error-page.component.scss',
})
export class ErrorPageComponent {
  constructor(private route: Router) {
    setTimeout(() => {
      this.route.navigate(['courses']);
    }, 4 * 1000);
  }
}
