import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/core/model/product.model';
import { ProductService } from 'src/app/core/services/product.service';
import { FormBuilder, Validators} from '@angular/forms'
import {Location} from '@angular/common';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {

  product: Product | undefined;
  categories: string[] = [];
  existe = false;
  prodId: number;
  cargado = false;

  productForm = this.formBuilder.group({
    title: ['', [Validators.required, Validators.maxLength(50)]],
    description: ['', Validators.required],
    price: ['', [Validators.min(0), Validators.required]],
    discountPercentage: ['', Validators.required],
    rating: ['', [Validators.min(0), Validators.max(5), Validators.required]],
    stock: ['', [Validators.min(0), Validators.required]],
    brand: ['', Validators.required],
    category: ['', Validators.required],
  });

  constructor(private readonly productService: ProductService,
              private route: ActivatedRoute,
              private formBuilder: FormBuilder,
              private location: Location) {
              this.prodId = 0;
   }

  ngOnInit(): void {
    this.getCategories();
    this.prodId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.prodId == 0){
      this.initializeEmptyProduct();
    } else {
      this.loadData();
      this.existe = true;
    }
    this.cargado = true;
  }

  getProductPromise(id: number) {
    this.productService.getSingleProduct(id)
    .subscribe({
      next: (response) => {
        this.product = response;
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  async getProduct(id: number) {
    this.product = await firstValueFrom(this.productService.getSingleProduct(id));
  }

  async loadData() {  
    
    await this.getProduct(this.prodId);

    if (!this.product){
      return; 
    }
    
    this.productForm.patchValue({
      id: this.product?.id,
      title: this.product?.title,
      description: this.product?.description,
      price: this.product?.price,
      discountPercentage: this.product?.discountPercentage,
      rating: this.product?.rating,
      stock: this.product?.stock,
      brand: this.product?.brand,
      category: this.product?.category,
      thumbnail: this.product?.thumbnail,
      images: this.product?.images
    });
  
  }

  onSubmit() {
    this.product = this.productForm.getRawValue() as Product;

    if (this.existe){
      this.updateProduct();
    } else {
      this.addProduct();
    }
  }

  addProduct() {
    if (this.product != undefined) {
      this.productService.addProduct(this.product)
        .subscribe({
          next: (response) => {
            console.log(response);
          },
          error: (error) => {
            console.log(error);
          }
        });
    }
  }

  updateProduct() {
    if (this.product != undefined) {
      this.productService.updateProduct(this.product)
        .subscribe({
          next: (response) => {
            this.product = response;
          },
          error: (error) => {
            console.log(error);
          }
        });
    }
  }

  getCategories() {
    this.productService.getCategories()
      .subscribe({
        next: (response) => {
          this.categories = response;
        },
        error: (error) => {
          console.log(error);
        }
      });
  }


  initializeEmptyProduct() {
    this.product = {
      id: 0,
      title: '',
      description: '',
      price: 0,
      discountPercentage: 0,
      rating: 0,
      stock: 0,
      brand: '',
      category: '',
      thumbnail: '',
      images: []
    }
  }

  goBack(): void {
    this.location.back();
  }



}
