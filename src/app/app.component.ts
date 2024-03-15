import { Component, OnInit, inject } from '@angular/core';
import { AuthService } from './services/auth.service';
import { User } from '../models/user.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  title = 'Smart City';


}
