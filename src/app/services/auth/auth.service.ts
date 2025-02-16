import { Injectable } from '@angular/core';
import { Firestore, collection, query, where, getDocs } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import * as bcrypt from 'bcryptjs'
;
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userSubject = new BehaviorSubject<boolean>(false);
  user$ = this.userSubject.asObservable();

  constructor(private firestore: Firestore, private router: Router) {}

  async login(username: string, password: string) {
    const adminRef = collection(this.firestore, 'admins');
    const q = query(adminRef, where('username', '==', username));
    const snapshot = await getDocs(q);

    if (!snapshot.empty) {
      const admin = snapshot.docs[0].data();
      const match = await bcrypt.compare(password, admin['password']); // Compare hashed password

      if (match) {
        localStorage.setItem('admin', JSON.stringify(admin['username']));
        this.userSubject.next(true);
        this.router.navigate(['/admin']);
        
      } else {
        throw new Error('Invalid password');
      }
    } else {
      throw new Error('User not found');
    }
  }

  logout() {
    localStorage.removeItem('admin');
    this.userSubject.next(false);
    this.router.navigate(['/login']);
  }

  get isAuthenticated() {
    return !!localStorage.getItem('admin');
  }
}
