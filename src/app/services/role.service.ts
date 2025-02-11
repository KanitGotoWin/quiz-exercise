import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  private roleSubject: BehaviorSubject<string> = new BehaviorSubject<string>(
    sessionStorage.getItem('role') || 'Choose your role'
  );

  role$ = this.roleSubject.asObservable();

  // Update role and store it in sessionStorage
  setRole(role: string) {
    sessionStorage.setItem('role', role);
    this.roleSubject.next(role); // Emit the updated role
  }
}
