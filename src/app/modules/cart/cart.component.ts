import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Cart } from 'src/app/core/model/cart.model';
import { CartService } from 'src/app/core/services/cart.service';
import { Location } from '@angular/common';
import { User } from 'src/app/core/model/user.model';
import { UserService } from 'src/app/core/services/user.service';
import { ProductService } from'src/app/core/services/product.service';
import { Product } from 'src/app/core/model/product.model';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cartUserId = 0;
  carts: Cart[] = [];
  user: User | undefined;
  total=0;
  emptyCart = false;
  loaded = false;
  prods: Product[] = [];


  constructor(private readonly cartService: CartService,
    private readonly userService: UserService,
    private readonly productService: ProductService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private location: Location) {
      this.cartUserId = Number(this.route.snapshot.paramMap.get('id'));
      this.getCartFromUser();
      
  }

  ngOnInit(): void {
    
    this.getUser(this.cartUserId);
    this.getCartFromUser();
    
  }

  goBack() {
    this.location.back();
  }

  getCartFromUser() {
    this.cartService.getCartsFromUser(this.cartUserId)
    .subscribe({
      next: (response) => {
        this.carts = response.carts;
        this.total = response.total;
        if (this.total != 0){
          for (let i=0; i< this.total; i++){
            for (let prod of this.carts[i].products){
              this.getProductFromId(prod.id);
            }
          }
        }
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => {
        this.loaded = true;
      }
      }
    );
    
  }

  getProductFromId(id: number){
    this.productService.getSingleProduct(id)
    .subscribe({
      next: (response) => {
        this.prods.push(response);
      },
      error: (response) => {
        console.log(response);
      }
    })
  }


  getUser(id: number) {
    this.userService.getUserById(id)
    .subscribe({
      next: (response) => {
        this.user = response;
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  getProductFromArray(id: number): Product | undefined {
    return this.prods.find((p) => p.id === id);
  }

}
