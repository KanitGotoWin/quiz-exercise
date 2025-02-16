import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { RoleService } from '../../../services/role.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatIconModule, RouterModule, ReactiveFormsModule, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  userForm: FormGroup;

  constructor(
    private router: Router,
    private roleService: RoleService,
    private fb: FormBuilder
  ) {
    this.userForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      // role: ['', [Validators.required]]
    });
  }

  selectRole(role: string) {
    // this.roleService.setRole(role);
    this.router.navigate(['/user/quiz']);
  }

  quizRegisterSubmit(){
    if (!this.userForm.valid) {
      this.userForm.markAllAsTouched();
      return;
    }
    // const {role} = this.userForm.value;
    // this.roleService.setRole(role);
    sessionStorage.setItem('registeredUser', JSON.stringify(this.userForm.value));
    this.router.navigate(['/user/quiz']);
  }
}
