import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';

import { environment } from 'src/environments/environment';

@Injectable({
	providedIn: 'root',
})
export class MessagingService {
	constructor(private http: HttpClient) {}

	sendMessage(title: string, message: string) {
		const headers = new HttpHeaders({'Content-Type': 'application/json'});

		return this.http.post<any>(`${environment.apiUrl}/send-message`, {title, body: message }, { headers }).pipe(
			catchError(err => {
				return throwError(() => err);
			})
		)
	}
}
