import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth/auth.service';
import { QuizService } from '../../../services/quiz.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-home.component.html',
  styleUrl: './admin-home.component.css',
})
export class AdminHomeComponent {
  userQuizSubmits: any[] = [];
  constructor(
    private quizService: QuizService,
    private authService: AuthService
  ) {}

  logout() {
    this.authService.logout();
  }

  fetchQuizSubmit() {
    this.quizService.getData().subscribe((data)=>{
      this.userQuizSubmits = data;
    })
  }

  ngOnInit(): void {
    this.fetchQuizSubmit();
  }
}
