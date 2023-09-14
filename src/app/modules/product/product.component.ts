import { Component, OnInit, ViewChild} from '@angular/core';
import { ProductService } from '../../core/services/product.service';
import { Product } from '../../core/model/product.model';
import { pages } from 'src/app/core/constants';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit{

  title = 'frontend-dummy-json';

  constructor(private readonly productService: ProductService) {}

 
  products: Product[] = [];
  numElementsPerPage = 0;
  total= 0;
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

  delete(id: number){
    this.productService.deleteProduct(id).subscribe({
      next: (response) => {
        if (response.isDeleted){

          alert('El producto ha sido eliminado correctamente.');
        }
      },
      error: (error) => {
        console.log(error);
        alert('Error eliminando el producto. No ha podido eliminarse correctamente.')
      }
    });
  }


}
