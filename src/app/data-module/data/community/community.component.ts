import { Component, OnInit, inject } from '@angular/core';
import { DataService } from '../../../services/data.service';
import { User } from '../../../../models/user.model';
import { Observable, tap, throwError } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-community',
  templateUrl: './community.component.html',
  styleUrl: './community.component.scss'
})
export class CommunityComponent implements OnInit {

  router:Router = inject(Router);
  dataService:DataService = inject(DataService);

  users!:Observable<User[]>;

  currentPage!:number;
  isForwardAvailable!:boolean;
  isForwardMoreAvailable!:boolean;
  searchParam!:string;
  searchValue!:string;
  perPageParam!:number;
  isSpinnerActive!:boolean


  constructor() {}


  ngOnInit(): void {
    this.isSpinnerActive = true;
    this.isForwardAvailable = true;
    this.isForwardMoreAvailable = true
    this.currentPage = 1;
    this.searchParam = "";
    this.searchValue = "";
    this.perPageParam = 10;

    this.users = this.dataService.getUsers(this.currentPage)
      .pipe(
        tap( ()=> this.isSpinnerActive = false),
      );

  }




  //gets posts based on the value emitted from the PaginationComponent
  public nextPageByPagination(page:number) {
    this.isSpinnerActive = true;
    this.currentPage = page;
    this.users =  this.dataService.getUsers(this.currentPage, this.perPageParam, this.searchParam, this.searchValue).pipe(
      tap(users=> {
        this.isForwardAvailable = users.length > 0;
        this.isForwardMoreAvailable = users.length === 10;
        this.isSpinnerActive = false;
      }),
    )
  }



  public getByParam(obj:{ nameParam:string, value:string }):void {

    this.searchParam = obj.nameParam;
    this.searchValue = obj.value;
    this.nextPageByPagination(1);
  }



  public setViewName() {
    this.dataService.setViewName("user");
  }

}
