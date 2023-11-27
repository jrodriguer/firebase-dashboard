import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Observer } from 'rxjs';

import { User } from '../../models/user.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
	providedIn: 'root',
})
export class AuthService {
	public tokenExpirationTimer: any;
	private userSubject = new BehaviorSubject<User | null>(null); // store and info user state
	public user$: Observable<User | null> = this.userSubject.asObservable();

	private userFCMToken: string = '';

	constructor(private http: HttpClient) {}

	/**
	 * Login #1 - Standard login with user & password
	 *
	 * @param user user email
	 * @param pass user password
	 *
	 * @returns operation result
	 */
	public login(user: string, pass: string): Observable<{}> {
		return this.http.post<{}>(
			'https://backend-dehesa.wenea.site/api/v7/user/login/',
			{
				email: user,
				password: pass,
			},
			{
				headers: {
					'Content-Type': 'application/json',
					'X-App-Version': '3.0.4',
				},
			}
		);
	}
}

// logout() {}
//
// private handleError(error: any): Promise<never> {
//   console.error('An error occurred:', error);
//   return Promise.reject(error.message || error);
// }
