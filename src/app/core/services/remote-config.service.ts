import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';

import { environment } from '../../../environments/environment';
import { VersionInfo } from '../models/remote-config.model';

@Injectable({
	providedIn: 'root',
})
export class RemoteConfigService {
	constructor(private http: HttpClient) {}

	public listVersions(): Observable<VersionInfo[]> {
		const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

		return this.http.get<VersionInfo[]>(`${environment.apiUrl}/list-versions`, { headers }).pipe(
			catchError(err => {
				return throwError(() => err);
			})
		);
	}

	public downloadTemplate(): Observable<VersionInfo> {
		const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

		return this.http.get<VersionInfo>(`${environment.apiUrl}/download-template`, { headers }).pipe(
			map(template => {
				return template;
			}),
			catchError(err => {
				return throwError(() => err);
			})
		);
	}

	public publishTemplate(file: File): Observable<string> {
		const formData: FormData = new FormData();
		formData.append('file', file);

		const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

		return this.http.post<string>(`${environment.apiUrl}/publish-template`, file, { headers }).pipe(
			catchError(err => {
				return throwError(() => err);
			})
		);
	}

	public updateTemplate(
		name: string,
		expression: string,
		parameter: string,
		defaultValue: string,
		conditionValue: string
	) {
		const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

		return this.http
			.put<string>(
				`${environment.apiUrl}/update-template`,
				{ name, expression, parameter, defaultValue, conditionValue },
				{ headers }
			)
			.pipe(
				catchError(err => {
					return throwError(() => err);
				})
			);
	}
}
