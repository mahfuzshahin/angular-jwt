import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs';
import {environment} from "../environments/environments";
import {User} from "../model/user";
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl = environment.baseUrl;
  constructor(private http: HttpClient) { }

  login(data: any) {
    return this.http.post(`${this.baseUrl}/login`, data)
      .pipe(map(result => {
        localStorage.setItem('authUser', JSON.stringify(result));
        console.log(result)
        return result;

      }));
  }
  postLogin(user:User){
    return this.http.post(`${this.baseUrl}/login`, user)
      .pipe(map(result => {
        localStorage.setItem('authUser', JSON.stringify(result));
        console.log(result)
        return result;
      }));
  }
  register(data: any) {
    return this.http.post(`${this.baseUrl}/register`, data);
  }
  postRegister(user:User){
    return this.http.post(`${this.baseUrl}/register`, user);
  }
  profile() {
    return this.http.get(`${this.baseUrl}/profile`);
  }
  logout() {
    return this.http.get(`${this.baseUrl}/logout`)
      .pipe(tap(() => {
        localStorage.removeItem('authUser')
      }));
  }
  getAuthUser() {
    return JSON.parse(localStorage.getItem('authUser') as string);
  }
  get isLoggedIn() {
    if (localStorage.getItem('authUser')) {
      return true;
    }
    return false;
  }
}
