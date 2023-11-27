import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { User } from '../../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public tokenExpirationTimer: any;
  private userSubject = new BehaviorSubject<User | null>(null); // store and info user state
  public user$: Observable<User | null> = this.userSubject.asObservable();

  constructor() {}

  // {..params} email: string, password: string
  signIn() {}

  logout() {}

  private handleError(error: any): Promise<never> {
    console.error('An error occurred:', error);
    return Promise.reject(error.message || error);
  }
}
