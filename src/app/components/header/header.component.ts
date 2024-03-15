import { AfterContentChecked, AfterViewChecked, AfterViewInit, Component, Input, OnChanges, OnInit, inject } from '@angular/core';
import { DataService } from '../../services/data.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent  implements AfterContentChecked {


  router:Router = inject(Router);
  dataService:DataService = inject(DataService);
  authService:AuthService = inject(AuthService);
  logged:boolean = false;

  ngAfterContentChecked(): void {
      this.logged = this.authService.isLogged();
  }

  public setView(value:string):void {
    this.dataService.setViewName(value);
  }

  public onLogout() {
    this.authService.updateUser({status:"inactive"}).subscribe();//to set the user status to 'inactive'
    this.authService.logOut();
    this.router.navigate(['/auth']);
  }

 }
