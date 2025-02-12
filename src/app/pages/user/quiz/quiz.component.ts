import { Component, EventEmitter, Input, Output } from '@angular/core';
import { quizData } from '../../../quiz';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { QuizService } from '../../../services/quiz.service';
@Component({
  selector: 'app-quiz',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css'],
})
export class QuizComponent {
  constructor(private quizService: QuizService, private router: Router) {}
  @Input() currentPage: number = 1;
  @Input() isLast: boolean = false;
  @Input() answer: any = '';
  @Output() answerChange = new EventEmitter<string>();
  quizLength = quizData.length;

  updateAnswer(event: Event) {
    const input = (event.target as HTMLTextAreaElement).value;
    console.log(input);
    console.log('Update Answer');
    this.answerChange.emit(input);
  }

  submitAnswer() {
    const savedAnswers = sessionStorage.getItem('quizAnswers');
    const answers = savedAnswers
      ? JSON.parse(savedAnswers)
      : new Array(this.quizLength).fill('');
      
    this.quizService
      .submitQuiz(answers)
      .then(() => {
        alert('Quiz submitted successfully!');
        sessionStorage.removeItem('quizAnswers');
        sessionStorage.removeItem('currentPage');
        sessionStorage.removeItem('role');
        this.router.navigate(['/']);
      })
      .catch((error) => console.error('Error submitting quiz:', error));
  }

  get currentQuiz() {
    return quizData[this.currentPage - 1];
  }
}
