import { Component, inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Auth } from '../../../../models/auth.model';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  authService:AuthService = inject(AuthService);
  router:Router = inject (Router);
  authData?:Auth;


  public onSubmit(form:NgForm) {

    this.authData = {
      dateMillis: (new Date().getTime() + (60*60*1000)),
      token: form.control.value.token,
    }

    form.control.setValue({token:''});

    this.authService.store('auth', this.authData);
    this.router.navigate(['/']);
  }

}
