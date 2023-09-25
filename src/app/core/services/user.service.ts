import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { UserResponse } from '../model/user-response.model';
import { User } from '../model/user.model';
import { Response } from '../model/response.model';
import { CartResponse } from '../model/cart-response.model';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  

  apiUrl = environment.API_URL;

  constructor(private readonly http: HttpClient) { }

  getAllUsers(): Observable<UserResponse> {
    return this.http.get<UserResponse>(`${this.apiUrl}/users`);
  }

  getUsersInterval(limit: number, skip: number): Observable<UserResponse> {
    return this.http.get<UserResponse>(`${this.apiUrl}/users?limit=${limit}&skip=${skip}`);
  }

  searchUser(name: string, limit: number, skip: number): Observable<UserResponse> {
    return this.http.get<UserResponse>(`${this.apiUrl}/users/search?q=${name}&limit=${limit}&skip=${skip}`);
  }

  getUserById(userId: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/users/${userId}`);
  }

  addUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/users/add`, user);
  }

  updateUser(user: User): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/users/${user.id}`, user);
  }

  deleteUser(userId: number): Observable<User> {
    return this.http.delete<User>(`${this.apiUrl}/users/${userId}`);
  }

  filterUsers(filterKey: string, filterValue: string, limit: number, skip: number): Observable<UserResponse> {
    return this.http.get<UserResponse>(`${this.apiUrl}/users/filter?key=${filterKey}&value=${filterValue}&limit=${limit}&skip=${skip}`);
  }

  test(): Observable<Response> {
    return this.http.get<Response>(`${this.apiUrl}/test`);
  }

}
