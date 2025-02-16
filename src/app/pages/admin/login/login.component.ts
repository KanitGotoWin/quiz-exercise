import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth/auth.service';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) {}

  async onLogin() {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;
      try {
        await this.authService.login(username!, password!);
      } catch (error: any) {
        console.log(error.message);
        
        this.errorMessage = error.message;
      }
    }
  }

  checkRedirect(){
    if(this.authService.isAuthenticated){
      this.router.navigate(['/admin'])
    }
  }

  ngOnInit(): void {
    this.checkRedirect();
  }
}
