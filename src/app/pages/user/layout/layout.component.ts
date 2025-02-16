import { Component } from '@angular/core';
import {
  ActivatedRoute,
  Router,
  RouterLink,
  RouterOutlet,
} from '@angular/router';
import { CommonModule } from '@angular/common';
import { QuizComponent } from '../quiz/quiz.component';
@Component({
  selector: 'app-user-layout',
  standalone: true,
  imports: [CommonModule, QuizComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css',
})
export class LayoutComponent {
  quizLength = 10;
  role: string | null = 'Choose your role';
  currentPage = 1;
  isLast: boolean = false;
  isNextable: boolean = false;
  isPrevable: boolean = false;
  quizSubmitted: boolean = JSON.parse(sessionStorage.getItem('quizSubmitted') || 'false');
  answers: string[];

  constructor(private router: Router) {
    const savedPage = sessionStorage.getItem('currentPage');
    const savedAnswers = sessionStorage.getItem('quizAnswers');
    this.answers = savedAnswers ? JSON.parse(savedAnswers) : new Array(this.quizLength).fill('');

    if (savedPage) {
      this.currentPage = parseInt(savedPage, 10);
    }
    this.updateButtonStates();
  }

  prevQuestion() {
    if (this.currentPage > 1) {
      this.currentPage--;
      sessionStorage.setItem('currentPage', this.currentPage.toString());
    }
    this.updateButtonStates();
  }

  nextQuestion() {
    if (this.currentPage < this.quizLength) {
      this.currentPage++;
      sessionStorage.setItem('currentPage', this.currentPage.toString()); // Save page number
    }
    this.updateButtonStates();
  }

  checkIsLast() {
    this.isLast = this.currentPage === this.quizLength;
  }

  checkIsNextable(){
    this.isNextable = this.currentPage === this.quizLength;
  }

  checkIsPrevable(){
    this.isPrevable = this.currentPage === 1;
  }

  updateButtonStates(){
    this.checkIsLast();
    this.checkIsNextable();
    this.checkIsPrevable();
  }

  saveAnswer(answer: string){
    this.answers[this.currentPage - 1] = answer;
    sessionStorage.setItem('quizAnswers', JSON.stringify(this.answers));
  }

  onQuizSubmitted(){
    this.quizSubmitted = true;
    sessionStorage.setItem('quizSubmitted', JSON.stringify(this.quizSubmitted));
  }

  redo(){
    sessionStorage.removeItem('quizSubmitted');
    sessionStorage.removeItem('registeredUser');
    sessionStorage.removeItem('storedData');
    this.quizSubmitted = false;
    this.router.navigate(['/']);
  }

}
