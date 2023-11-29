import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';

import { environment } from '../../../environments/environment';
import { RemoteVersions } from '../models/remote-config.model';

@Injectable({
	providedIn: 'root',
})
export class RemoteConfigService {
	constructor(private http: HttpClient) {}

	public listVersions() {
		return this.http
			.get<RemoteVersions>(`${environment.apiUrl}/list-versions`, {
				headers: new HttpHeaders({
					'Content-Type': 'application/json',
				}),
			})
			.pipe(
				catchError(err => {
					return throwError(() => err);
				})
			);
	}

	public currentVersion() {
		return this.http
			.get<any>(`${environment.apiUrl}/download-template`, {
				headers: new HttpHeaders({
					'Content-Type': 'application/json',
				}),
			})
			.pipe(
				catchError(err => {
					return throwError(() => err);
				})
			);
	}
}
