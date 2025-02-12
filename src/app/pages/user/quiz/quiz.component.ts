import { Component, EventEmitter, Input, Output } from '@angular/core';
import { quizData } from '../../../quiz';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-quiz',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css'] 
})
export class QuizComponent {
  @Input() currentPage: number = 1;
  @Input() isLast: boolean = false;
  @Input() answer: any = "";
  @Output() answerChange = new EventEmitter<string>();
  quizLength = quizData.length;

  updateAnswer(event: Event){
    const input = (event.target as HTMLTextAreaElement).value;
    console.log(input);
    console.log("Update Answer")
    this.answerChange.emit(input);
  }

  get currentQuiz() {
    return quizData[this.currentPage - 1]; 
  }
}