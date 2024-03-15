import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './data-module/data/page-not-found/page-not-found.component';
import { UtilComponent } from './utils/util/util.component';

const routes: Routes = [
  {
    path:'data',
    title:'SmartCity community',
    loadChildren:()=> import('./data-module/data.module').then(module => module.DataModule),
  },
  {
    path:'',
    redirectTo:'data',
    pathMatch:'full',
  },
  {
    path:'auth',
    loadChildren: ()=> import('./auth-module/auth.module').then(module => module.AuthModule),
  },
  {
    path:'reload',
    component:UtilComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
