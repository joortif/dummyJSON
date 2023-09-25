import { Component, OnChanges, OnInit } from '@angular/core';
import { ProductService } from '../../core/services/product.service';
import { Product } from '../../core/model/product.model';
import { pages } from 'src/app/core/constants';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  title = 'frontend-dummy-json';
  activeImageIndex=0;

  constructor(private readonly productService: ProductService) { }

  

  products: Product[] = [];
  total = 0;
  limit = pages.numItems;
  cargado = false;
  currentPage = 0;
  searchBoxText = '';


  ngOnInit() {
    this.changePage(0);

  }

  getAll() {
    this.productService.getAllProducts().subscribe({
      next: response => {
        this.products = response.products;
        this.total = response.total;
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => {
        this.cargado = true;
      }
    })
  }


  search(query: string) {
    this.productService.searchProductInterval(query, this.limit, this.limit * this.currentPage)
      .subscribe({
        next: (response) => {
          this.products = response.products;
          this.total = response.total;
          this.searchBoxText = query;
        },
        error: (error) => {
          console.log(error);
        }
      });

  }

  changePage(page: number) {
    this.currentPage = page;
    
    this.productService.searchProductInterval(this.searchBoxText, this.limit, this.limit * page).subscribe({
      next: (response) => {
        this.products = response.products;
        this.total = response.total;
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => {
        this.cargado = true;
      }
    });
  }

  delete(id: number) {
    let type: string;
    let msg: string;
    this.productService.deleteProduct(id).subscribe({
      next: (response) => {
        if (response.isDeleted) {
          type = "success";
          msg = "El producto " + response.title + " se ha eliminado correctamente";
        } else {
          type = "danger";
          msg = "El producto " + response.title + " no se ha podido eliminar correctamente."
        }
        
      },
      error: (error) => {
        console.log(error);
        type = "danger";
          msg = "El producto no se ha podido eliminar correctamente."
      },
      complete: () => {
        let alertPlaceholder = document.getElementById('liveAlertPlaceholder')
        let wrapper = document.createElement('div')

        wrapper.innerHTML = '<div class="alert alert-' + type + ' alert-dismissible" role="alert">' + msg + '<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>'

        if (alertPlaceholder?.hasChildNodes) {
          alertPlaceholder.innerHTML = '';
        }
        alertPlaceholder?.append(wrapper)
        window.scrollTo(0, 0);
      },
    });

  }

  limitChanged(limit: number){
    this.limit = limit;
    this.changePage(this.currentPage);
  }

  prevImg(id: number){
    const productIndex = this.products.findIndex(p => p.id === id);
  if (productIndex !== -1) {
    const product = this.products[productIndex];
    this.activeImageIndex = (this.activeImageIndex - 1 + product.images.length) % product.images.length;
  }
  }

  nextImg(id: number){
    const productIndex = this.products.findIndex(p => p.id === id);
  if (productIndex !== -1) {
    const product = this.products[productIndex];
    this.activeImageIndex = (this.activeImageIndex + 1) % product.images.length;
  }
  }

}
