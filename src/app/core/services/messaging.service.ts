import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';

import { environment } from 'src/environments/environment';

@Injectable({
	providedIn: 'root',
})
export class MessagingService {
	constructor(private http: HttpClient) {}

	sendMessage(topic: string, token: string, title: string, message: string) {
		const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

		return this.http
			.post<string>(
				`${environment.apiUrl}/send-message`,
				{ topic, token, title, message },
				{ headers }
			)
			.pipe(
				catchError(err => {
					return throwError(() => err);
				})
			);
	}
}
