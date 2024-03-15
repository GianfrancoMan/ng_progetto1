import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { User } from '../../../../models/user.model';
import { DataService } from '../../../services/data.service';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {

  @ViewChild('detailsForm') public formModify!:NgForm;

  router:Router = inject(Router);
  route:ActivatedRoute = inject(ActivatedRoute);

  userId = -1;
  modifying = {name:false, email:false, gender:false};

  user?:User;

  constructor(private authService:AuthService, private dataService:DataService) {
  }

  ngOnInit() {
    this.user = this.authService.loggedUser;
    setTimeout(()=>{
      this.formModify.control.setValue({name:this.user?.name, email:this.user?.email, gender:this.user?.gender, status:this.user?.status});
    },0);
    if(this.user?.id) {
      this.userId = this.user.id;
    }
  }


  public setView(value:string):void {
    this.dataService.setViewName(value);
  }

  //enables  the field group interested to the changes
  public onClickModify(value:string, form:NgForm) {
    this.onCancelModify(form);
    switch(value) {
      case 'name' : {
        this.modifying.name=true;
        this.modifying.email=false;
        this.modifying.gender=false;
       }
       break;
      case 'email' : {
        this.modifying.name=false;
        this.modifying.email=true;
        this.modifying.gender=false;
       }
       break;
      case 'gender' : {
        this.modifying.name=false;
        this.modifying.email=false;
        this.modifying.gender=true;
       } break;
      default: {
        this.modifying.name=false;
        this.modifying.email=false;
        this.modifying.gender=false;
       }
    }
  }

  //clears and disables all field group
  public onCancelModify(form:NgForm) {
    this.modifying.name=false;
    this.modifying.email=false;
    this.modifying.gender=false;
    form.control.setValue(
      {
        name:this.user?.name,
        email:this.user?.email,
        status:this.user?.status,
        gender:this.user?.gender,
      }
    );
  }

  public onSendModify(form:NgForm, label:string) {
    if(label==='name') {
      this.authService.updateUser({name:form.value.name}).subscribe( (updatedUser:User) =>{
        this.authService.store('user', updatedUser);
        this.user = this.authService.loggedUser;
        this.onCancelModify(form);
      })
    }
    if(label==='email') {
      this.authService.updateUser({email:form.value.email}).subscribe( (updatedUser:User) =>{
        this.authService.store('user', updatedUser);
        this.user = this.authService.loggedUser;
        this.onCancelModify(form);
      })
    }
    if(label==='gender') {
      this.authService.updateUser({gender:form.value.gender}).subscribe( (updatedUser:User) =>{
        this.authService.store('user', updatedUser);
        this.user = this.authService.loggedUser;
        this.onCancelModify(form);
      })
    }
  }

  public unsubscribeUser() {
    if(confirm("Are you sure?\nIf you confirm your data will be permanently lost")) {
      this.authService.unsubscribe();
    }
  }


}
