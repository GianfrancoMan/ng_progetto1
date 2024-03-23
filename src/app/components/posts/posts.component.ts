import { Component, Input, OnInit, ViewChild, inject } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Observable, catchError, finalize, of, tap } from 'rxjs';
import { Post } from '../../../models/post.model';
import { Comment } from '../../../models/comment.model';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.scss'
})
export class PostsComponent implements OnInit {

  @Input() id!:number;
  @ViewChild('thoughtForm') form_thought!:NgForm;

  private dataService:DataService = inject(DataService);
  private authService:AuthService = inject(AuthService);
  private router:Router = inject(Router);
  private route:ActivatedRoute = inject(ActivatedRoute);

  posts!:Observable<Post[]>;
  comments!:Observable<Comment[]>;

  doComment:boolean = false;
  open:number = -1; //to manage expansion panels;
  isSpinnerActive:boolean =true;
  currentPage!:number;
  searchParam:string = "";
  searchValue:string = "";
  perPageParam:number = 10;
  isForwardAvailable!:boolean;
  isForwardMoreAvailable!:boolean;
  isPost:boolean = true;
  isEditable:boolean = false;
  usersEmail!:any;
  loggedId?:number;



  constructor() {
  }

  ngOnInit() {
    this.usersEmail = {};
    this.isSpinnerActive =true;
    this.isForwardAvailable = true;
    this.isForwardMoreAvailable = true
    this.currentPage = 1;
    this.searchParam = "";
    this.searchValue = "";
    this.perPageParam = 10;

    this.loggedId = this.authService.loggedUser?.id;

    if(this.id) {
      if(this.authService.isLogged()) {
        this.isEditable = (this.authService.loggedUser?.id === this.id) ? true : false;
      }
      this.posts = this.dataService.getUserPosts(this.id, this.currentPage).pipe(
        tap((posts) => {
          if (posts.length === 0) this.isPost = false;
          this.isSpinnerActive = false;
        }),
      );
    }
    else {
      this.isEditable = true;
      this.posts = this.dataService.getPosts(this.currentPage, this.perPageParam, this.searchParam, this.searchValue).pipe(
        tap((posts) => {
          posts.forEach( p => {
            this.usersEmail[p.id] = p.user_id;
          })
          this.isPost = true;
        }),
        finalize(()=> {
          this.getUserOwner();
          this.isSpinnerActive = false;
        }),
      );
    }
  }

  private getUserOwner() {
    for(let key in this.usersEmail) {
      this.dataService.getUserById(Number(this.usersEmail[key])).pipe(
        catchError( //provides a next value in place of the missing next one for the http error.
          (err)=> of({
              id:0,
              name:'',
              email:'Unsubscribed user',
              gender:'',
              status:'',
        })),
      ).subscribe({
          next: u => {
           this.usersEmail[key] = u.email;
           console.log(this.usersEmail[key])
          },
          error: ()=> {
            console.log('Occurred Errors kick in catchError.');
          },
          complete:()=> {
          }
      });
    }
  }



  //onOpened manages the section of the expandable panel where  comments will be retrieved if any.
  public onOpened(postId:number) {
    this.isSpinnerActive =true;
    this.open = postId;
    if(this.doComment) this.doComment = false;
    this.comments = this.dataService.getComments(postId)
      .pipe(
        finalize( ()=> this.isSpinnerActive = false),
      );
  }



  //onComment and onCancel manage the display of the send comment section
  public onComment() {
    this.doComment = true;
  }
  public onCancel() {
    this.doComment = false;
  }



  //saves a comment and hides the send comment section
  public onSubmit(form:NgForm, postId:number) {
    let id = postId;
    this.dataService.saveComment(form.control.get('comment')?.value, id).subscribe(()=>{
      this.reloadCurrentPage();
      this.doComment = false;
    });
  }



  //gets posts based on the value emitted from the PaginationComponent
  public nextPageByPagination(page:number) {
    this.usersEmail = {};
    this.isSpinnerActive = true;
    this.currentPage = page;

    if(this.id) {
      this.posts =  this.dataService.getUserPosts(this.id, this.currentPage).pipe(
        tap(posts=> {
          this.isForwardAvailable = posts.length > 0;
          this.isForwardMoreAvailable = posts.length === 10;
          this.isSpinnerActive = false;
        }),
      );
    }
    else {
      this.posts =  this.dataService.getPosts(this.currentPage, this.perPageParam, this.searchParam, this.searchValue).pipe(
        tap(posts=> {
          posts.forEach( p => {
            this.usersEmail[p.id] = p.user_id;
          })
          this.isForwardAvailable = posts.length > 0;
          this.isForwardMoreAvailable = posts.length === 10;
        }),
        finalize(()=> {
          this.getUserOwner();
          this.isSpinnerActive = false;
        }),
      );
    }

  }


  //Set parameters to get posts by search key
  public getByTitle(obj:{ nameParam:string, value:string }) {
    this.searchParam = obj.nameParam;
    this.searchValue = obj.value;
    this.nextPageByPagination(1);
  }

  //Handles the storing of a users's post.
  public onSubmitPost(form:NgForm) {
    let body = form.value.thought;
    let title = form.value.title;
    if(body !== '' && title !== '') {
      let userId = this.authService.loggedUser?.id ?  this.authService.loggedUser?.id : -1;
      this.dataService.savePost({id:this.id, user_id:userId, title, body}).subscribe(()=> this.reloadCurrentPage());
      this.onCancelPost()
    } else {
      this.onCancelPost();
    }

  }

  public onCancelPost() {
    this.form_thought.control.setValue({title:'', thought:''});
  }



  private reloadCurrentPage() {
    let redirect = '/';
    this.route.url.subscribe( url => {
      url.forEach( segment=> {  //construct the url of the current page
        redirect += segment+'/';
      });
      this.router.navigate(['/reload'], {queryParams:{redirect}});//sends the current URL as extra data to UtilComponent which will redirect to this view
    });
  }

}
