import { Routes } from '@angular/router';
import { HomeComponent } from './pages/user/home/home.component';
import { QuizComponent } from './pages/user/quiz/quiz.component';

export const routes: Routes = [
  // {
  //   path: '',
  //   redirectTo: 'home',
  //   pathMatch: 'full'
  // },
  // {
  //   path: 'home',
  //   component: HomeComponent
  // },
  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full' // Ensures it only matches the exact empty path
  },
  {
    path: 'quiz',
    component: QuizComponent
  }
];
