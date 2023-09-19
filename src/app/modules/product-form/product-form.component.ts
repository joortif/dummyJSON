import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/core/model/product.model';
import { ProductService } from 'src/app/core/services/product.service';
import { FormBuilder, Validators } from '@angular/forms'
import { Location } from '@angular/common';
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
  msg = '';
  type = '';

  productForm = this.formBuilder.group({
    title: ['', [Validators.required, Validators.maxLength(50)]],
    description: [''],
    price: ['', [Validators.min(0), Validators.required]],
    discountPercentage: [''],
    rating: ['', [Validators.min(0), Validators.max(5)]],
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
    if (this.prodId == 0) {
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

    if (!this.product) {
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
    if (this.existe) {
      this.product.id = this.prodId;
      this.updateProduct();
    } else {
      this.addProduct();
    }


  }

  addProduct() {
    if (this.product != undefined) {
      let type: string;
      let msg: string;
      this.productService.addProduct(this.product)
        .subscribe({
          next: (response) => {
            type = "success";
            msg = "El producto ha sido añadido correctamente. Su nuevo código es: " + response.id + ".";
          },
          error: (error) => {
            console.log(error);
            type = "danger";
            msg = "El producto no ha podido añadirse correctamente."
          },
          complete: () => {
            let alertPlaceholder = document.getElementById('liveAlertPlaceholder')
            let wrapper = document.createElement('div')

            wrapper.innerHTML = '<div class="alert alert-' + type + ' alert-dismissible" role="alert">' + msg + '<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>'

            if (alertPlaceholder?.hasChildNodes) {
              alertPlaceholder.innerHTML = '';
            }
            alertPlaceholder?.append(wrapper)
          }
        });
    }
  }

  updateProduct() {
    if (this.product != undefined) {
      console.log(this.product);

      this.productService.updateProduct(this.product)
        .subscribe({
          next: (response) => {
            this.product = response;
            this.type = "success";
            this.msg = "El producto ha sido modificado correctamente.";
          },
          error: (error) => {
            console.log(error);
            this.type = "danger";
            this.msg = "El producto no ha podido modificarse."
          },
          complete: () => {
            let alertPlaceholder = document.getElementById('liveAlertPlaceholder')
            let wrapper = document.createElement('div')

            wrapper.innerHTML = '<div class="alert alert-' + this.type + ' alert-dismissible" role="alert">' + this.msg + '<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>'

            if (alertPlaceholder?.hasChildNodes) {
              alertPlaceholder.innerHTML = '';
            }
            alertPlaceholder?.append(wrapper)
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
