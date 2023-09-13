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
  @ViewChild('searchBox') searchBox: HTMLInputElement = new HTMLInputElement();

  title = 'frontend-dummy-json';

  constructor(private readonly productService: ProductService) {}

 
  products: Product[] = [];
  numElementsPerPage = 0;
  total= 0;
  limit = pages.numItems;
  cargado = false;
  
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
    if (this.searchBox.value.trim.length == 0){
      this.productService.searchProduct(query).subscribe({
        next: (response) => {
          this.products = response.products;
          this.total = response.total;
        },
        error: (error) => {
          console.log(error);
        }
      }
      );
    } else {
       // ENVIAR SOLICITUD AL SERVIDOR CON Q
    }

  }
  
  changePage(page: number) {
    this.productService.getProductsInterval(this.limit, this.limit * page).subscribe({
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
