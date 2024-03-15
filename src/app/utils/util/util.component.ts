
/*
 * This component is used as utility to reload page
 * when an user posts his thought or comments posts of other users
 */
import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-util',
  templateUrl: './util.component.html',
  styleUrl: './util.component.scss'
})
export class UtilComponent implements OnInit{

  route:ActivatedRoute = inject(ActivatedRoute);
  router:Router = inject(Router);
  url?:string;

  ngOnInit(): void {
    this.reload();
  }

  //The query params contains the url of the view to 'reload'.
  private reload() {
    this.route.queryParams.subscribe(p=> {
      this.url = p['redirect'];

      if(this.url)
        console.log("reload",this.url);
        this.router.navigate([this.url]);

    });
  }

}
