import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrl: './page-not-found.component.scss'
})
export class PageNotFoundComponent implements OnInit {

  route:ActivatedRoute = inject(ActivatedRoute);
  router:Router = inject(Router);
  authService:AuthService = inject(AuthService);
  message?:string;

  ngOnInit() {
    this.route.queryParams.subscribe(p=> {
      this.message = p['message']
      if(this.message) {
        this.authService.logOut();
      }
    });
  }

  public onClick() {
    this.router.navigate(['/'])
  }

}
