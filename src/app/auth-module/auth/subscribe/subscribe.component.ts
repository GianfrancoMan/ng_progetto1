import { Component, inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { User } from '../../../../models/user.model';
import { Auth } from '../../../../models/auth.model';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-subscribe',
  templateUrl: './subscribe.component.html',
  styleUrl: './subscribe.component.scss'
})
export class SubscribeComponent {

  authService:AuthService = inject(AuthService);
  router:Router = inject(Router);



  public onSubmit(form:NgForm) {
    let userData:User = {
      name: form.control.value.name,
      email: form.control.value.email,
      gender: form.control.value.gender,
      status:"active",
    }
    let authData:Auth = {
      dateMillis: (new Date().getTime() + (60*60*1000)),//user login expire after an hour
      token: form.control.value.token,
    }

    this.authService.store('user', userData);
    this.authService.store('auth', authData);

    this.authService.createUser(userData)
        .subscribe({
          next: user => {
            this.authService.store('user', user);
            this.router.navigate(['/'])
          },
          error: (err => {
            if(err instanceof HttpErrorResponse) {
              this.authService.unsubscribe();

              this.router.navigate(['/error'], {queryParams:{message:'Verify that you typed the correct access token'}});
            }
          }),
    });
  }

}
