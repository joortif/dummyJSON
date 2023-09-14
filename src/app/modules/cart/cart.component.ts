import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Cart } from 'src/app/core/model/cart.model';
import { CartService } from 'src/app/core/services/cart.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cartUserId: number;
  carts: Cart[] = [];
  total=0;

  constructor(private readonly cartService: CartService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private location: Location) {
    this.cartUserId = 0;
  }

  ngOnInit(): void {
    this.cartUserId = Number(this.route.snapshot.paramMap.get('id'));
    this.cartService.getCartsFromUser(this.cartUserId)
    .subscribe({
      next: (response) => {
        this.carts = response.carts;
        this.total = response.total;
      },
      error: (error) => {
        console.log(error);
      }
      }
    );
  }

  goBack() {
    this.location.back();
  }




}
