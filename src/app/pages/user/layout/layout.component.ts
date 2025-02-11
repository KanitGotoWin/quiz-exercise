import { Component, Inject, Input, PLATFORM_ID } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { RoleService } from '../../../services/role.service';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-user-layout',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {
  role: string | null = 'Choose your role'; // Default value

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private roleService: RoleService,
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      const selectedRole = sessionStorage.getItem('role');
      console.log(`${selectedRole} - Home`);
    } else {
      console.log("Running on the server - sessionStorage not accessible.");
    }

    this.roleService.role$.subscribe(role => {
      this.role = role;
    });

    console.log(this.role);
  }
}
