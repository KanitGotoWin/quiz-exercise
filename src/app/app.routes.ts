import { Routes } from '@angular/router';
import { HomeComponent } from './pages/user/home/home.component';
import { QuizComponent } from './pages/user/quiz/quiz.component';
import { LayoutComponent } from './pages/user/layout/layout.component';
import { LoginComponent } from './pages/admin/login/login.component';
import { AdminHomeComponent } from './pages/admin/admin-home/admin-home.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full' 
  },
  {
    path: 'user', 
    component: LayoutComponent, 
    children: [
      { path: 'quiz', component: QuizComponent },
      { path: '**', redirectTo: 'quiz' }
    ]
  },
  { path: 'login', component: LoginComponent },
  { path: 'admin', component: AdminHomeComponent, canActivate: [authGuard]  },
];
