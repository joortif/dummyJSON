import { Component, OnInit, Input, EventEmitter, Output, OnChanges, SimpleChanges } from '@angular/core';
import { pages } from 'src/app/core/constants';
import { ProductService } from 'src/app/core/services/product.service';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {

  actualPage = 0;
  @Input() limit = 0;
  @Input() totalItems = 0;
  @Output() pageChanged = new EventEmitter<number>();
  @Output() limitChange = new EventEmitter<number>();

  totalPages = 0;
  numPages = Array<number>();
  numPagesOptions = Array<number>();
  

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
      if (changes['limit'] && changes['limit'].currentValue){
          this.changeTotalPages(this.limit.toString());
      }
      }
      
  ngOnInit(): void {
      this.numPagesOptions = Array.from({ length: 13}, (v, i) => i + 4);
      this.changeTotalPages('12')
  }

  changeTotalPages(items: string) {
    this.limit = Number(items);
    this.totalPages = Math.ceil(this.totalItems / this.limit);
    this.numPages = Array.from({ length: this.totalPages }, (v, i) => i + 1);
    this.limitChange.emit(this.limit);
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
