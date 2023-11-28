import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Observer, catchError, map, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { User } from '../../models/user.model';
import {
	WENEA_USER_LOGIN,
	BASE_REST_HEADER,
	WENEA_USER_PROFILE,
	WENEA_VERSION,
} from '../../utils/constans';

@Injectable({
	providedIn: 'root',
})
export class AuthService {
	private userSubject = new BehaviorSubject<User | null>(null);
	public user$: Observable<User | null> = this.userSubject.asObservable();

	public userToken: any;

	constructor(private http: HttpClient) {}

	login(user: string, pass: string): Observable<{}> {
		return this.http.post<{}>(
			WENEA_USER_LOGIN,
			{
				email: user,
				password: pass,
			},
			{ headers: BASE_REST_HEADER }
		);
	}

	loginToken(token: string): Observable<any> {
		this.userToken = token;
		return this.getUserInfo().pipe(
			map(() => ({ result: true })),
			catchError(err => {
				if (err.status !== 400) {
					return throwError(() => err);
				} else {
					return throwError(() => ({ result: true }));
				}
			})
		);
	}

	// logout() {}

	sendFCMToken(): Observable<any> {
		return new Observable((observer: Observer<{}>) => {});
	}

	// deleteFCMToken() {}

	getUserInfo(): Observable<{}> {
		const headers = this.buildSelfTokenHeader();
		return this.http.get<{}>(WENEA_USER_PROFILE, { headers }).pipe(
			catchError(err => {
				return throwError(() => err);
			})
		);
	}

	isLoggedIn(): boolean {
		return this.userToken != undefined;
	}

	buildTokenHeader(token: string): HttpHeaders {
		const header = new HttpHeaders({
			'Content-Type': 'application/json',
			Authorization: 'Token ' + token,
			'X-App-Version': WENEA_VERSION,
		});
		return header;
	}

	buildSelfTokenHeader(): HttpHeaders {
		let header: HttpHeaders;
		if (this.isLoggedIn()) {
			header = this.buildTokenHeader(this.userToken);
		} else {
			header = BASE_REST_HEADER;
		}
		return header;
	}

	// private handleError(error: any): Promise<never> {
	//   console.error('An error occurred:', error);
	//   return Promise.reject(error.message || error);
	// }
}
