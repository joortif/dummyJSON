import { Component, OnInit, Input, EventEmitter, Output, OnChanges, SimpleChanges } from '@angular/core';
import { pages } from 'src/app/core/constants';
import { ProductService } from 'src/app/core/services/product.service';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit, OnChanges {

  actualPage = 0;
  limit = pages.numItems;
  @Input() numElementsPerPage = 0;
  @Input() totalItems = 0;
  @Output() pageChanged = new EventEmitter<number>();

  totalPages = 0;
  numPages = Array<number>();
  numPagesOptions = Array<number>();
  

  constructor(private readonly productService: ProductService) { }

  ngOnChanges(changes: SimpleChanges): void {
      for (const propName in changes) {
        if (changes.hasOwnProperty(propName)) {
              this.changeTotalPages();
          }
        }
      }

  ngOnInit(): void {
      this.numPagesOptions = Array.from({ length: 13}, (v, i) => i + 4);
  }

  changeTotalPages() {
    this.totalPages = Math.ceil(this.totalItems / this.limit);
    this.numPages = Array.from({ length: this.totalPages }, (v, i) => i + 1);
  }

  changePage(page: number) {
    this.actualPage = page;
    this.pageChanged.emit(this.actualPage);
  }

  nextPage() {
    if (this.actualPage+1 < this.totalPages){
      this.actualPage++;
      this.pageChanged.emit(this.actualPage);
    }
  }

  previousPage() {
    if (this.actualPage-1 >= 0){
      this.actualPage--;
      this.pageChanged.emit(this.actualPage);
    }
    
  }
  

}
