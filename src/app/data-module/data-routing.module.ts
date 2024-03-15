import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DataComponent } from './data/data.component';
import { CommunityComponent } from './data/community/community.component';
import { UserComponent } from './data/user/user.component';
import { ForumComponent } from './data/forum/forum.component';
import { ProfileComponent } from './data/profile/profile.component';
import { loginGuard } from '../guard/login.guard';
import { PageNotFoundComponent } from './data/page-not-found/page-not-found.component';

const routes: Routes = [
  {
    path:'',
    component:DataComponent,
    canActivate:[loginGuard],
    children:[
      {
        path:'',
        canActivateChild:[loginGuard],
        children:[
          {
            path:'',
            component:CommunityComponent,
          },
          {
            path:'users/:id',
            title:'SmartCity details',
            component:UserComponent,
          },
          {
            path:'posts',
            title:'SmartCity forum',
            component:ForumComponent,
          },
          {
            path:'profile',
            title:'SmartCity profile',
            component:ProfileComponent,
          },
        ],
      },
    ],
  },
  {
    path:'**',
    title:'SmartCity page not found',
    component:PageNotFoundComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DataRoutingModule { }
