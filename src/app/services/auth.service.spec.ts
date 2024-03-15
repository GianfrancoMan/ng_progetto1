import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { getMockUser } from '../utils/testing-utility/moks';

describe('AuthService', () => {
  let authService: AuthService;
  let httpTestingController:HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule, RouterTestingModule],
      providers:[AuthService],
    });
    authService = TestBed.inject(AuthService);
    httpTestingController = TestBed.inject(HttpTestingController);
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
});
