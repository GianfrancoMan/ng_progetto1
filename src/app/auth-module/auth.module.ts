import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { FormsModule } from '@angular/forms';

import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

import { LoginComponent } from './auth/login/login.component';
import { SubscribeComponent } from './auth/subscribe/subscribe.component';
import { AuthComponent } from './auth/auth/auth.component';


@NgModule({
  declarations: [
    LoginComponent,
    SubscribeComponent,
    AuthComponent,
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
  ]
})
export class AuthModule { }
