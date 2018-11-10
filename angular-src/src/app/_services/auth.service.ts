import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../_models/user';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authToken: any;
  user: any;
  constructor(private http: HttpClient) { }

  // Register
  register(user: User) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post<any>('http://localhost:3000/users/register', user, {headers: headers})
    .pipe(map(res => res));
  }

  // Login check for the Authenticated user
  authenticateUser(user: User) {
    this.getToken();
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post<any>('http://localhost:3000/users/authenticate', user, {headers: headers})
    .pipe(map(res => res));
  }

  // get token from localStorage
  getToken() {
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }

  // Storing token and user in localStorage
  storeUser(token, user) {
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }

  // accessing sales
  sales() {
    this.getToken();
    const headers = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': this.authToken, 'Cache-Control': 'no-cache'});
    return this.http.get<any>('http://localhost:3000/users/sales', {headers: headers})
    .pipe(map(res => res));
  }

  // accessing accounts
  accounts() {
    this.getToken();
    const headers = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': this.authToken, 'Cache-Control': 'no-cache'});
    return this.http.get<any>('http://localhost:3000/users/accounts', {headers: headers})
    .pipe(map(res => res));
  }

  // logout and clear localStorage
  logout() {
    localStorage.removeItem('id_token');
    localStorage.removeItem('user');
    this.authToken = null;
    this.user = null;
  }
}

