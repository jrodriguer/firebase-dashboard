import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';

import { environment } from '../../../environments/environment';
import { RemoteVersions, VersionInfo } from '../models/remote-config.model';

@Injectable({
	providedIn: 'root',
})
export class RemoteConfigService {
	constructor(private http: HttpClient) {}

	public listVersions(): Observable<RemoteVersions> {
		const headers = new HttpHeaders({
			'Content-Type': 'application/json',
			// 'Authorization': ''
		});

		return this.http.get<RemoteVersions>(`${environment.apiUrl}/list-versions`, { headers }).pipe(
			catchError(err => {
				return throwError(() => err);
			})
		);
	}

	public currentVersion(): Observable<VersionInfo> {
		const headers = new HttpHeaders({
			'Content-Type': 'application/json',
			// 'Authorization': ''
		});

		return this.http.get<VersionInfo>(`${environment.apiUrl}/download-template`, { headers }).pipe(
			map((template) => {
				return template;
			}),
			catchError(err => {
				return throwError(() => err);
			})
		);
	}
}
