import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CartResponse } from '../model/cart-response.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  apiUrl = environment.API_URL;

  constructor(private readonly http: HttpClient) {

  }

  getCartsFromUser(userId: number): Observable<CartResponse> {
    return this.http.get<CartResponse>(`${this.apiUrl}/carts/user/${userId}`);
  }

  getAll(): Observable<CartResponse> {
    return this.http.get<CartResponse>(`${this.apiUrl}/carts`);
  }


}
