import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ProductResponse } from '../model/product-response.model';
import { Product } from '../model/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  apiUrl = environment.API_URL;

  constructor(private readonly http: HttpClient) { }

  getAllProducts(): Observable<ProductResponse> {
    return this.http.get<ProductResponse>(`${this.apiUrl}/products`);
  }

  searchProduct(name: string): Observable<ProductResponse> {
    return this.http.get<ProductResponse>(`${this.apiUrl}/products/search?q=${name}`);
  }

  searchProductInterval(name: string, limit: number, skip: number): Observable<ProductResponse> {
    console.log(`${this.apiUrl}/products/search?q=${name}&limit=${limit}&skip=${skip}`)
    return this.http.get<ProductResponse>(`${this.apiUrl}/products/search?q=${name}&limit=${limit}&skip=${skip}`);
  }

  getSingleProduct(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/products/${id}`);
  }

  getProductsInterval(limit: number, skip: number): Observable<ProductResponse> {
    return this.http.get<ProductResponse>(`${this.apiUrl}/products?limit=${limit}&skip=${skip}`);
  }

  getCategories(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/products/categories`);
  }

  addProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(`${this.apiUrl}/products/add`, product);
  }

  updateProduct(product: Product): Observable<Product> {
    return this.http.put<Product>(`${this.apiUrl}/products/${product.id}`, product);
  }

  deleteProduct(id: number): Observable<Product> {
    return this.http.delete<Product>(`${this.apiUrl}/products/${id}`);
  }
}
