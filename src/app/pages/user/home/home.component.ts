import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { RoleService } from '../../../services/role.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatIconModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  constructor(
    private router: Router,
    private roleService: RoleService
  ) {

  }

  ngOnInit(): void {
    const selectedRole = sessionStorage.getItem('role');   
    console.log(`${selectedRole} - Home`); 
  }

  selectRole(role: string) {
    this.roleService.setRole(role);
    this.router.navigate(['/user/quiz']);
  }

  test(data: string){
    console.log("test funnction");
  }
}
