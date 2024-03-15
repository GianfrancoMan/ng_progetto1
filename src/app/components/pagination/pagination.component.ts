import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss'
})
export class PaginationComponent {

  @Input() page!:number;
  @Input() isForwardAvailable!:boolean;
  @Input() isForwardMoreAvailable!:boolean;
  @Output() pageEmitter:EventEmitter<number>= new EventEmitter<number>();


  //manages pagination
  public nextPage(action:string) {
    switch(action) {
      case "next": this.page +=1;
      break;
      case "nextMore": this.page += 10;
      break;
      case "prev": this.page -=1;
      break;
      case "prevMore": this.page -= 10;
      break;
    }
    this.pageEmitter.emit(this.page);
  }

}
