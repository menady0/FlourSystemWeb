import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<any> {
    return this.http.post<any>('apiLink', { username, password }).pipe(
      tap(response => {
        localStorage.setItem('token', response.token);
        localStorage.setItem('userID', response.user.id.toString());
        localStorage.setItem('name', response.user.name);
      })
    );
  }

  isLoggedIn(): boolean {
    const token = localStorage.getItem('token');
    return true; //Reminder: Remove this
    return !!token;
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('userID');
    localStorage.removeItem('name');
  }
}