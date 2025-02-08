import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LayoutComponent } from '../layout/layout.component';

@Component({
  selector: 'app-quiz',
  standalone: true,
  imports: [RouterOutlet, LayoutComponent],
  templateUrl: './quiz.component.html',
  styleUrl: './quiz.component.css'
})
export class QuizComponent {
  
  ngOnInit(): void {
    const selectedRole = localStorage.getItem('selectedRole');
    
    
  }
}
