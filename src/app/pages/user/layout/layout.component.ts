import { Component } from '@angular/core';
import {
  ActivatedRoute,
  Router,
  RouterLink,
  RouterOutlet,
} from '@angular/router';
import { RoleService } from '../../../services/role.service';
import { CommonModule } from '@angular/common';
import { QuizComponent } from '../quiz/quiz.component';
import { quizData } from '../../../quiz';
@Component({
  selector: 'app-user-layout',
  standalone: true,
  imports: [RouterOutlet, CommonModule, QuizComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css',
})
export class LayoutComponent {
  quizLength = quizData.length;
  role: string | null = 'Choose your role';
  currentPage = 1;
  isLast: boolean = false;
  isNextable: boolean = false;
  isPrevable: boolean = false;
  answers: string[];

  constructor(
    private roleService: RoleService,
    private route: ActivatedRoute,
    private router: Router
  ) {
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

    console.log(this.answers)
  }

  ngOnInit(): void {
    this.roleService.role$.subscribe((role) => {
      this.role = role;
    });

    // this.route.firstChild?.paramMap.subscribe(params => {
    //   const page = Number(params.get('id')) || 1;
    //   if (page < 1 || page > this.quizLength) {
    //     alert(`Invalid question number! Redirecting to question ${this.quizLength}.`);
    //     this.router.navigate(['/user/quiz', this.quizLength]);
    //   } else {
    //     this.currentPage = page;
    //     this.checkIsLast();
    //   }
    // });
  }
}
