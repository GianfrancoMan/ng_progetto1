import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from '../../../../models/user.model';
import { DataService } from '../../../services/data.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent implements OnInit{

  userId!:number;

  route:ActivatedRoute = inject(ActivatedRoute);
  dataService:DataService = inject(DataService);

  user!:Observable<User>;


  ngOnInit(): void {
    this.userId = Number(this.route.snapshot.paramMap.get('id'));

    this.user = this.dataService.getUserById(this.userId);
  }

  public setView(value:string):void {
    this.dataService.setViewName(value);
  }

}
