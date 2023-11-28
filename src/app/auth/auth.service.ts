import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Observer, catchError, map, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { User } from '../../models/user.model';
import { environment } from '../../environments/environment';

const BASE_URI_DES = `https://backend-des.wenea.site/api`;
const BASE_URI_PRE = `https://backend-pre.wenea.site/api`;
const BASE_URI_PRO = `https://backend-pro.wenea.site/api`;
const BASE_URI_DEHESA = `https://backend-dehesa.wenea.site/api`;

const WENEA_API_VERSION = 'v7';
const WENEA_VERSION = environment.version;
const BASE_URI: string = BASE_URI_DEHESA;
const USER_ENDPOINT = `${BASE_URI}/${WENEA_API_VERSION}/user`;

const WENEA_USER_LOGIN = `${USER_ENDPOINT}/login/`;
const WENEA_USER_PROFILE = `${USER_ENDPOINT}/info/`;

const BASE_REST_HEADER = new HttpHeaders({
	'Content-Type': 'application/json',
	'X-App-Version': WENEA_VERSION,
});

@Injectable({
	providedIn: 'root',
})
export class AuthService {
	private userSubject = new BehaviorSubject<User | null>(null); // store and info user state
	public user$: Observable<User | null> = this.userSubject.asObservable();

	private userFCMToken: string = '';
	public userToken: any;

	constructor(private http: HttpClient) {}

	/**
	 * Login #1 - Standard login with user & password.
	 *
	 * @param user user email.
	 * @param pass user password.
	 *
	 * @returns operation result.
	 */
	public login(user: string, pass: string): Observable<{}> {
		return this.http.post<{}>(
			WENEA_USER_LOGIN,
			{
				email: user,
				password: pass,
			},
			{ headers: BASE_REST_HEADER }
		);
	}

	/**
	 * Login #2 - Store user token.
	 *
	 * @param token - token present.
	 *
	 * @returns observer with token.
	 */
	loginToken(token: string): Observable<any> {
    this.userToken = token;
    return this.getUserInfo().pipe(
      map((res: any) => ({ result: true })),
      catchError((err) => {
        if (err.status !== 400) {
          return throwError(() => err);
        } else {
          return throwError(() => ({ result: true }));
        }
      })
    );
	}

	/**
	 * sendFCMToken - Send FCM token to backend.
	 *
	 * @returns Observable with operation result.
	 */
	sendFCMToken(): Observable<any> {
		return new Observable((observer: Observer<{}>) => {});
	}

	/**
	 * getUserInfo - Request all user info & fill userGroup attribute.
	 *
	 * @returns Observable with request result.
	 */
	getUserInfo(): Observable<{}> {
		return new Observable((observer: Observer<{}>) => {
			this.http.post<{}>(WENEA_USER_PROFILE, { headers: this.buildSelfTokenHeader() });
		});
	}

	/**
	 * buildTokenHeader - Build a header with a given token.
	 *
	 * @param token backend token.
	 *
	 * @returns header with token.
	 */
	public buildTokenHeader(token: string): HttpHeaders {
		let header = new HttpHeaders({
			'Content-Type': 'application/json',
			Authorization: 'Token ' + token,
			'X-App-Version': WENEA_VERSION,
		});
		return header;
	}

	/**
	 * isLoggedIn -  Check if user is currently logged in
	 *
	 * @returns bool flag.
	 */
	public isLoggedIn(): boolean {
		return this.userToken != undefined;
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
}

// logout() {}
//
// private handleError(error: any): Promise<never> {
//   console.error('An error occurred:', error);
//   return Promise.reject(error.message || error);
// }
