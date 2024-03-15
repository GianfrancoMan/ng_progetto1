import { TestBed, fakeAsync, flushMicrotasks, waitForAsync } from '@angular/core/testing';

import { DataService } from './data.service';
import { HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing'
import { AuthService } from './auth.service';
import { RouterTestingModule } from '@angular/router/testing';
import { getMockComments, getMockPosts, getMockUser, getMockUserPosts, getMockUsers } from '../utils/testing-utility/moks';
import { User } from '../../models/user.model';
import { Post } from '../../models/post.model';

describe('DataService', () => {
  let dataService: DataService;
  let httpTestingController:HttpTestingController;
  let authServiceSpy = jasmine.createSpyObj<AuthService>("AuthService", ['getAccessToken']);
  let fakeAuthService:any;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule, RouterTestingModule],
      providers:[DataService, {provide:AuthService, useValue:authServiceSpy}],
    });
    dataService = TestBed.inject(DataService);
    httpTestingController = TestBed.inject(HttpTestingController);
    fakeAuthService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
  });

  it('should be created', () => {
    expect(dataService).toBeTruthy();
  });

  it('retrieves all users', ()=>{
    dataService.getUsers().subscribe((users) =>{
      expect(users).toBeTruthy();
      expect(users.length).toBeGreaterThan(0);
      let user = users.find((u:User)=>u.id == 2);
      expect(user?.name).toEqual(getMockUser(2).name);
    });

    const req = httpTestingController.expectOne('https://gorest.co.in/public/v2/users?page=1&per_page=10&=');
    expect(req.request.method).toEqual("GET");
    req.flush(getMockUsers());
  });


  it('retrieves a specific users', ()=>{
    dataService.getUserById(2).subscribe((user) =>{
      expect(user).toBeTruthy();
      expect(user?.id).toEqual(getMockUser(2).id);
      expect(user?.name).toEqual(getMockUser(2).name);
      expect(user?.email).toEqual(getMockUser(2).email);
      expect(user?.gender).toEqual(getMockUser(2).gender);
      expect(user?.status).toEqual(getMockUser(2).status);
    });

    const req = httpTestingController.expectOne('https://gorest.co.in/public/v2/users/2');
    expect(req.request.method).toEqual("GET");
    req.flush(getMockUser(2));
  });


  it('retrieves all posts', ()=>{
    dataService.getPosts().subscribe((posts) =>{
      expect(posts).toBeTruthy();
      expect(posts.length).toBeGreaterThan(0);
      let post = posts.find((p:Post)=>p.user_id == 2);
      expect(post?.title).toEqual(getMockUserPosts(2)[0].title);
    });

    const req = httpTestingController.expectOne('https://gorest.co.in/public/v2/posts?page=1&per_page=10&=');
    expect(req.request.method).toEqual("GET");
    req.flush(getMockPosts());
  });


  it('retrieves all posts of a specific user', ()=>{
    dataService.getUserPosts(2).subscribe((posts) =>{
      expect(posts).toBeTruthy();
      expect(posts.length).toBeGreaterThan(0);
      let post = posts.find((p:Post)=>p.user_id == 2);
      expect(post?.user_id).toEqual(getMockUser(2).id);
    });

    const req = httpTestingController.expectOne('https://gorest.co.in/public/v2/users/2/posts?page=1&per_page=10');
    expect(req.request.method).toEqual("GET");
    req.flush(getMockUserPosts(2));
  });


  it("save user's post", ()=>{
    dataService.savePost(getMockPosts()[0]).subscribe((post) =>{
      expect(post).toBeTruthy();
      expect(post.user_id).toEqual(getMockPosts()[0].user_id);
      expect(post.id).toEqual(getMockPosts()[0].id);
      expect(post.title).toEqual(getMockPosts()[0].title);
      expect(post.body).toEqual(getMockPosts()[0].body);
    });

    const req = httpTestingController.expectOne('https://gorest.co.in/public/v2/posts');
    expect(req.request.method).toEqual("POST");
    req.flush(getMockPosts()[0]);
  });


  it('retrieves all comments of a specific post', ()=>{
    dataService.getComments(2).subscribe((comments) =>{
      expect(comments).toBeTruthy();
      expect(comments.length).toBeGreaterThan(0);
      expect(comments.length).toEqual(2);
      expect(comments[0].body).toEqual('comment body 1');
    });

    const req = httpTestingController.expectOne('https://gorest.co.in/public/v2/posts/2/comments');
    expect(req.request.method).toEqual("GET");
    req.flush(getMockComments(2));
  });

  //https://gorest.co.in/public/v2/posts/[post_id]/comments
  it("save post's comment", ()=>{
    let comment = getMockComments(3)[0].body;
    dataService.saveComment(comment, 2).subscribe((comment) =>{
      expect(comment).toBeTruthy();
      expect(comment.post_id).toEqual(getMockComments(3)[0].post_id);
      expect(comment.id).toEqual(getMockComments(3)[0].id);
      expect(comment.body).toEqual(getMockComments(3)[0].body);
      expect(comment.name).toEqual('Ginco Gallino');
    });

    const req = httpTestingController.expectOne('https://gorest.co.in/public/v2/posts/2/comments');
    expect(req.request.method).toEqual("POST");
    req.flush(getMockComments(3)[0]);
  });

});
