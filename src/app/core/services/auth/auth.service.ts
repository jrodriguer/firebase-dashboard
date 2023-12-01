import { Injectable, computed, effect, signal } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { User } from '../../models';
import {
	WENEA_USER_LOGIN,
	BASE_REST_HEADER,
	WENEA_USER_PROFILE,
	WENEA_VERSION,
} from '../../../../utils/constants';

type AuthState = {
	user: User | null;
	token: string | null;
	is_auth: boolean;
	loading: boolean;
};

@Injectable({
	providedIn: 'root',
})
export class AuthService {
	private accessTokenKey: string = '';
	private storedToken = localStorage.getItem(this.accessTokenKey);
	private state = signal<AuthState>({
		user: null,
		token: this.storedToken,
		is_auth: this.storedToken !== null,
		loading: false,
	});
	public token = computed(() => this.state().token);
	public loading = computed(() => this.state().loading);
	public isAuth = computed(() => this.state().is_auth);
	public user = computed(() => this.state().user);

	constructor(private http: HttpClient) {
		effect(() => {
			const token = this.token();
			if(token !== null) {
				localStorage.setItem(this.accessTokenKey, token);
			} else {
				localStorage.removeItem(this.accessTokenKey);
			}
		});
	}

	login(user: string, pass: string): Observable<{ token: string }> {
		return this.http.post<{ token: string }>(
      WENEA_USER_LOGIN,
      {
        email: user,
        password: pass,
      },
      { headers: BASE_REST_HEADER }
    ).pipe(
      map((res: { token: string }) => {
        this.state.set({
          ...this.state(),
          token: res.token,
          is_auth: true,
          loading: false,
        });
        return res;
      }),
      catchError((err) => {
        this.state.set({
          ...this.state(),
          loading: false,
        });
        return throwError(() => err);
      })
    );
	}

	loginToken(token: string): Observable<{ result: boolean }> {
		this.accessTokenKey = token;
		return this.getUserProfile().pipe(
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

	// TODO: Add logout method.
	// logout() {}

	public getUserProfile():Observable<User> {
		const headers = this.buildSelfTokenHeader();
		return this.http.get<User>(WENEA_USER_PROFILE, { headers }).pipe(
			map((user: User) => {
				this.state.set({ ...this.state(), user });
				return user;
			}),
			catchError(err => {
				return throwError(() => err);
			})
		);
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
		if (this.isAuth()) {
			header = this.buildTokenHeader(this.accessTokenKey);
		} else {
			header = BASE_REST_HEADER;
		}
		return header;
	}
}
