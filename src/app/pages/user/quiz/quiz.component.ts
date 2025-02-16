import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { QuizService } from '../../../services/quiz.service';
import { GetQuestionService } from '../../../services/get-question.service';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-quiz',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css'],
})
export class QuizComponent {
  @Input() currentPage: number = 1;
  @Input() isLast: boolean = false;
  @Input() answer: string = '';
  @Input() answers: string[] = [];
  @Input() quizSubmitted: boolean = false;
  @Output() answerChange = new EventEmitter<string>();
  @Output() quizSubmittedChange = new EventEmitter<boolean>();
  quizLength: number = 10;
  quizData: any[] = [];
  storedData: any | null = JSON.parse(sessionStorage.getItem('storedData') || 'null');
  submitScore: number = this.storedData?.score || 0;
  
  constructor(
    private quizService: QuizService,
    private router: Router,
    private questionDataService: GetQuestionService
  ) {}

  get currentQuiz() {
    return this.quizData.length > 0
      ? this.quizData[this.currentPage - 1]
      : null;
  }

  updateAnswer(event: Event) {
    const input = (event.target as HTMLTextAreaElement).value;
    this.answerChange.emit(input);

    console.log(this.currentQuiz.answer === input);
  }

  submitAnswer() {
    this.calculateScore();
    this.quizService
      .submitQuiz(this.answers, this.submitScore)
      .then((res) => {
        this.quizSubmittedChange.emit(true);
        this.storedData = res;
        sessionStorage.setItem('storedData', JSON.stringify(res)); 
        this.resetStoredData();
      })
      .catch((error) => console.error('Error submitting quiz:', error));
  }

  fetchQuizData() {
    this.questionDataService.getRandomQuestions(this.quizLength).subscribe({
      next: (questions) => {
        this.quizData = questions;
      },
      error: (error) => {
      },
      complete: () => {
      },
    });
  }

  calculateScore() {
    this.submitScore = 0;
    this.quizData.forEach((item, index) => {
      if (this.answers[index] === item.answer) {
        this.submitScore++;
      }
    });
  }

  resetStoredData() {
    sessionStorage.removeItem('quizAnswers');
    sessionStorage.removeItem('currentPage');
  }

  isCorrect(index: number): boolean {
    return this.storedData?.answers[index] === this.quizData[index]?.answer;
  }

  checkUserInfo(){
    let storedUser = sessionStorage.getItem('registeredUser');
    if(!storedUser){
      this.router.navigate(['/']);
    }
  }

  ngOnInit(): void {
    this.checkUserInfo();
    this.fetchQuizData();
  }
}
