import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';

import { environment } from '../../../environments/environment';
import { RemoteVersions, VersionInfo } from '../models/remote-config.model';

@Injectable({
	providedIn: 'root',
})
export class RemoteConfigService {
	constructor(private http: HttpClient) {}

	public listVersions() {
		const headers = new HttpHeaders({
			'Content-Type': 'application/json',
			// 'Authorization': ''
		});

		return this.http
			.get<RemoteVersions>(`${environment.apiUrl}/list-versions`, {headers})
			.pipe(
				catchError(err => {
					return throwError(() => err);
				})
			);
	}

	public currentVersion() {
		const headers = new HttpHeaders({
			'Content-Type': 'application/json',
			// 'Authorization': ''
		});

		return this.http
			.get<VersionInfo>(`${environment.apiUrl}/download-template`, {headers})
			.pipe(
				catchError(err => {
					return throwError(() => err);
				})
			);
	}
}
