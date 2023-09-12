import { Cart } from './cart.model';

export interface CartResponse {
    carts: Cart[]
    total: number
    skip: number
    limit: number
  }