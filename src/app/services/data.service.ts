import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { User } from '../../models/user.model';
import { Observable, ObservedValueOf } from 'rxjs';
import { Post } from '../../models/post.model';
import { Comment } from '../../models/comment.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  http:HttpClient = inject(HttpClient);
  authService:AuthService = inject(AuthService);

  public BASE_URL:string = 'https://gorest.co.in/public/v2';
  public COMMENT_SEGMENT = '/comments';
  public POSTS_SEGMENT ='/posts';
  public USER_SEGMENT ='/users';
  public PAGE:string = '?page=';
  public PER_PAGE:string = '&per_page=';

  viewName:string = "";

  constructor() {}


  //Gets the first page first page of users with 10 elements
  //Data will be retrieved from the https://gorest.co.in/public/v2/users?page=1&per_page=10
  public getUsers(page:number = 1, perPage = 10, param="", value=""): Observable<User[]> {

    return this.http.get<User[]>(
      `${this.BASE_URL}${this.USER_SEGMENT}${this.PAGE}${page}${this.PER_PAGE}${perPage}&${param}=${value}`,
        this.setHttpOption()
      );
  }


  //gets a user by his unique ID
  //Data will be retrieved from the https://gorest.co.in/public/v2/users/[user id]
  //Method GET
  public getUserById(userId:number):Observable<User> {
    return this.http.get<User>(`${this.BASE_URL}${this.USER_SEGMENT}/${userId}`, this.setHttpOption());
  }


  //gets the first page of a specific user's posts
  //Data will be retrieved from the https://gorest.co.in/public/v2/user/[user id]/posts?page=1&per_page=10
  //Method GET
  public getUserPosts(userId:number, page= 1, perPage= 10):Observable<Post[]> {
    return this.http.get<Post[]>(`${this.BASE_URL}${this.USER_SEGMENT}/${userId}${this.POSTS_SEGMENT}${this.PAGE}${page}${this.PER_PAGE}${perPage}`
    , this.setHttpOption());
  }



  //gets the first page of all users posts
  //Data will be retrieved from the https://gorest.co.in/public/v2/posts?page=1&per_page=10
  //Method GET
  public getPosts(page= 1, perPage= 10, param="", value=""):Observable<Post[]> {
    return this.http.get<Post[]>(`${this.BASE_URL}${this.POSTS_SEGMENT}${this.PAGE}${page}${this.PER_PAGE}${perPage}&${param}=${value}`, this.setHttpOption());
  }



  //Saves a new post of a user
  //Data will be stored by the endpoint https://gorest.co.in/public/v2/posts
  //Body {user_id:number, title:string, body:string;} is required
  //Bearer Token is required
  //method POST
  public savePost(post:Post):Observable<Post> {
    let body = {
      user_id:post.user_id,
      title:post.title,
      body:post.body,
    };

    return this.http.post<Post>(`${this.BASE_URL}${this.POSTS_SEGMENT}`, body, this.setHttpOption());
  }


  //Gets the first page of comments for a specific post
  //Data will be retrieved from the https://gorest.co.in/public/v2/posts/[post_id]/comments
  //Method GET
  public getComments(postId:number):Observable<Comment[]> {
    return this.http.get<Comment[]>(`${this.BASE_URL}${this.POSTS_SEGMENT}/${postId}${this.COMMENT_SEGMENT}`, this.setHttpOption());
  }


  //Saves a new comment for a specific post
  //Data will be stored by the endpoint https://gorest.co.in/public/v2/posts/[post_id]/comments
  //Body {name:string, email:string, post_id:number, body:string} is required.
  //Bearer Token is required
  //Method POST
  public saveComment(comment:string, postId:number):Observable<Comment> {
    const body = {
      name:this.authService.loggedUser ? this.authService.loggedUser.name : "unknown",
      email:this.authService.loggedUser ? this.authService.loggedUser.email : "unknown",
      post_id:postId,
      body:comment,
    };

    return this.http.post<Comment>(`${this.BASE_URL}${this.POSTS_SEGMENT}/${postId}${this.COMMENT_SEGMENT}`, body, this.setHttpOption());
  }



  //helpers methods to mange the visibility of the search bar
  public setViewName(viewName:string = ""):void {
    this.viewName = viewName
  }
  public isSearchAvailable():boolean {
    if(this.viewName.toLocaleLowerCase() === "user") return false;
    return true;
  }


  //Sets options for request where bearer token is required
  private setHttpOption() {
    let httpOptions = {
      headers: new HttpHeaders({ 'Authorization' : `Bearer ${this.authService.getAccessToken()}` }),
    };
    return httpOptions;
  }

}




