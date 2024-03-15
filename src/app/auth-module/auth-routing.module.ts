import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth/auth.component';
import { LoginComponent } from './auth/login/login.component';
import { SubscribeComponent } from './auth/subscribe/subscribe.component';
import { subscriptionGuard } from '../guard/subscription.guard';

const routes: Routes = [
  {
    path:'',
    component:AuthComponent,

    title:'SmartCity login',
    children:[
      {
        path:'',
        children:[
          {
            path:'',
            component:LoginComponent,
            canActivate:[subscriptionGuard],
          },
          {
            path:'subscription',
            component:SubscribeComponent,
            title:'SmartCity subscribe',
          },
        ],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
