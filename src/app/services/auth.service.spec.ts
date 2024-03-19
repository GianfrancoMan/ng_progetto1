import { TestBed, waitForAsync } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { getMockUser } from '../utils/testing-utility/moks';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { JsonPipe } from '@angular/common';
import { Auth } from '../../models/auth.model';
import { User } from '../../models/user.model';
import { of } from 'rxjs';

describe('AuthService', () => {
  let data:User = {id:1, name:'pinco', email:'aaa@aa.aa', gender:'male', status:'active'};
  let authService: AuthService;
  let httpTestingController:HttpTestingController;
  let http:HttpClient;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule, RouterTestingModule],
      providers:[AuthService],
    });
    http = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    authService = TestBed.inject(AuthService);
  }));

  afterEach(() => {
    httpTestingController.verify(); //Verifies that no requests are outstanding.
  });

  it('should be created', () => {
    expect(authService).toBeTruthy();
  });


  it("user account is create", ()=>{
    authService.createUser(getMockUser(2)).subscribe((user) =>{
      expect(user).toBeTruthy();
      expect(user.id).toEqual(getMockUser(2).id);
      expect(user.name).toEqual(getMockUser(2).name);
      expect(user.email).toEqual(getMockUser(2).email);
      expect(user.gender).toEqual(getMockUser(2).gender);
      expect(user.status).toEqual(getMockUser(2).status);
    });

    const req = httpTestingController.expectOne('https://gorest.co.in/public/v2/users');
    expect(req.request.method).toEqual("POST");
    req.flush(getMockUser(2));
  });



  it("user account is deleted", ()=>{
    authService.deleteUser(1).subscribe((user) =>{
      expect(user).toBeFalsy();
    });

    const req = httpTestingController.expectOne('https://gorest.co.in/public/v2/users/1');
    expect(req.request.method).toEqual("DELETE");
    req.flush(null);
  });

  it("user account is updated", ()=>{
    data = {id:1, name:'pinco', email:'aaa@aa.aa', gender:'male', status:'active'};

    authService.loggedUser = data;

    authService.updateUser({status:'active'}).subscribe((user) =>{
      expect(user).toEqual(data);
    });

    const req = httpTestingController.expectOne('https://gorest.co.in/public/v2/users/1');
    expect(req.request.method).toEqual("PATCH");
    req.flush(data);
  });


});
