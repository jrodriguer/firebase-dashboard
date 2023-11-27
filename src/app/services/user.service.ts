import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { UserDoc } from '../../models/ddbb.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) {}

  private buildHeaders() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${environment.apiUrl}`
    });
    return headers;
  }

  getUsers(): Observable<UserDoc[]> {
    const headers = this.buildHeaders();
    return this.http
      .get<UserDoc[]>(`${environment.apiUrl}/users`, {
        headers
      })
      .pipe(catchError(this.handleError));
  }

  getUser(id: string): Observable<UserDoc> {
    const headers = this.buildHeaders();
    return this.http
      .get<UserDoc>(`${environment.apiUrl}/user/${id}`, {
        headers
      })
      .pipe(catchError(this.handleError));
  }

  createUser(user: UserDoc): Observable<UserDoc> {
    const headers = this.buildHeaders();
    return this.http
      .post<UserDoc>(`${environment.apiUrl}/user`, user, {
        headers
      })
      .pipe(catchError(this.handleError));
  }

  updateUser(id: string, user: UserDoc): Observable<UserDoc> {
    const headers = this.buildHeaders();
    return this.http
      .put<UserDoc>(`${environment.apiUrl}/user/${id}`, user, {
        headers
      })
      .pipe(catchError(this.handleError));
  }

  // TODO: neccesary method?
  private handleError(error: any): Observable<never> {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
    }
    return throwError('Something bad happened; please try again later.');
  }
}
