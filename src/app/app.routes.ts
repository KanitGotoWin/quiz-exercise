import { Routes } from '@angular/router';
import { HomeComponent } from './pages/user/home/home.component';
import { QuizComponent } from './pages/user/quiz/quiz.component';
import { LayoutComponent } from './pages/user/layout/layout.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full' // Ensures it only matches the exact empty path
  },
  {
    path: 'user', 
    component: LayoutComponent, 
    children: [
      { path: 'quiz', component: QuizComponent }
    ]
  }
];
