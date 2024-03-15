import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { DataRoutingModule } from './data-routing.module';
import { FormsModule } from '@angular/forms';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTabsModule } from '@angular/material/tabs';
import { MatRadioModule } from '@angular/material/radio';


import { SearchComponent } from '../components/search/search.component';
import { PaginationComponent } from '../components/pagination/pagination.component';
import { PostsComponent } from '../components/posts/posts.component';
import { DataComponent } from './data/data.component';
import { CommunityComponent } from './data/community/community.component';
import { UserComponent } from './data/user/user.component';
import { ForumComponent } from './data/forum/forum.component';
import { ProfileComponent } from './data/profile/profile.component';



@NgModule({
  declarations: [
    DataComponent,
    CommunityComponent,
    UserComponent,
    ForumComponent,
    PaginationComponent,
    PostsComponent,
    ProfileComponent,
    SearchComponent,
  ],
  imports: [
    CommonModule,
    DataRoutingModule,
    HttpClientModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatExpansionModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatTabsModule,
    MatRadioModule,
  ]
})
export class DataModule { }
