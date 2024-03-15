import { Injectable, inject } from '@angular/core';
import { Auth } from '../../models/auth.model';
import { User } from '../../models/user.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of} from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  router:Router = inject(Router);
  route:ActivatedRoute = inject(ActivatedRoute);
  http:HttpClient = inject(HttpClient);

  private logged: boolean = true;
  private subscribed: boolean = true;
  loggedUser:User | undefined;


  constructor() {
  }



  /**Using data stored in the local cache, it checks whether the user is subscribed to the platform,
   * if so set the AuthService.subscribed property to true value and checks whether the user is logged in,
   * in which case set the AuthService.logged property to true value otherwise it sets it to false,
   * if the user is not registered on the platform both AuthService.subscribed
   * and AuthService.logged are set to false
   * */
  public checkAuth() {
    let user:User | undefined;
    let auth:Auth | undefined;

    let item =  localStorage.getItem('user') ? localStorage.getItem('user') : undefined;

    if(item) {
      user = (JSON.parse(item) as User);
      if(user.id) {
        this.subscribed = true;
        item =  localStorage.getItem('auth') ? localStorage.getItem('auth') : undefined;
        if(item) {
          auth = (JSON.parse(item) as Auth);
          if(auth) {
            if(new Date().getTime() < auth.dateMillis) {
                this.logged = true;
                this.loggedUser = user;
                this.setStatus(); //To set the user status to 'active'
            } else {
              this.logOut();
            }
          } else {
            this.logOut();
          }
        } else {
          this.logged = false;
          this.loggedUser = undefined;
        }
      } else {
        this.unsubscribe();
      }
    } else {
      this.subscribed = false;
      this.logged = false;
      this.loggedUser = undefined;
    }
}



  /**
   * Retrieve the value of the AuthService.logged property
   * @return true if user is logged otherwise false.
   */
  public isLogged(): boolean {
    return this.logged;
  }
  /**
   * Retrieve the value of the AuthService.subscribed property
   * @return true if user is subscribed otherwise false.
   */
  public isSubscribed(): boolean {
    return this.subscribed;
  }



  /**
   * Stores in the cache data passed as parameter
   * @param label the label to identifying the cookie
   * @param value the data to store.
   * @return true if the data was stored successfully.
  */
  public store(label:string, value:{}) {
    localStorage.removeItem(label);
    let jsonValue = JSON.stringify(value);
    localStorage.setItem(label, jsonValue);
    this.checkAuth();

    if(localStorage.getItem(label))
      return true;

    return false;
  }

  /**
   * Create a new user
   * @param body an instance of User interface
   * @return the User instance created  or null if the operation failed
  */
  public createUser(body:User):Observable<User> {
    return this.http.post<User>('https://gorest.co.in/public/v2/users', body, this.getOptions());
  }



   /**
   * Updates the user data
   * @param body an object what must be part of a User interface
   * @return the User instance updated  or a mock User object
  */
  public updateUser(body:object):Observable<User> {
    if(this.loggedUser) {
      let id = this.loggedUser.id;
      return this.http.patch<User>(`https://gorest.co.in/public/v2/users/${id}`, body, this.getOptions());

    } else {
      return of({name:"",email:"",gender:"",status:""});
    }
  }



  /**
   * Delete user from the platform in permanent way
   * @param id The unique ID of the user
  */
  public deleteUser(id:number) {
    return this.http.delete<any>(`https://gorest.co.in/public/v2/users/${id}`, this.getOptions());
  }



  //return the access token
  public getAccessToken():string {
    let auth = this.getData('auth') as Auth;
    if(auth)return auth.token;
    else return "";
  }



  //remove auth data from the local storage to when user log out or unsubscribed
  public logOut() {
    localStorage.removeItem('auth');
    this.logged = false;
    this.loggedUser = undefined;
  }



  //remove use data from the local storage when the user unsubscribe
  public unsubscribe() {
    if(this.loggedUser?.id)
      this.deleteUser(this.loggedUser.id).subscribe( ()=> {
        this.logOut();
        localStorage.removeItem('user');
        this.subscribed = false;
        let redirect = '/';
        this.route.url.subscribe( url => {
          url.forEach( segment=> {  //construct the url of the current page
            redirect += segment+'/';
          });
          this.router.navigate(['/reload'], {queryParams:{redirect}});//sends the current URL as extra data to UtilComponent which will redirect to this view
        });
    })
  }



  //Set the user status passed as parameter
  public setStatus() {
    this.updateUser({status:"active"})
      .subscribe({
        error: err => {
          this.logOut();
          this.router.navigate(['/not-found'], {queryParams:{message:'Verify that you typed the correct access token'}});
        }
      }
    );
  }



  //return data stored in the cache if them exist.
  private getData(label:string):object | undefined {
    let value = localStorage.getItem(label);
    if(value)
      return JSON.parse(value);

    return undefined;
  }



  //set http options
  private getOptions():object {
    let httpOptions = {
      headers: new HttpHeaders({ 'Authorization' : `Bearer ${this.getAccessToken()}` }),
    };
    return httpOptions;
  }

}
