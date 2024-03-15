import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscribeComponent } from './subscribe.component';
import { AuthService } from '../../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AppModule } from '../../../app.module';
import { of } from 'rxjs';

describe('SubscribeComponent', () => {

    const inputData =  {
      name: 'pinco pallino',
      email: 'aaa@test.net',
      gender: 'gender',
      status:'active',
    };

    const user =of({
      id:1,
      name: 'pinco pallino',
      email: 'aaa@test.net',
      gender: 'gender',
      status:'active',});

    const fakeAuthService = jasmine.createSpyObj<AuthService>("AuthService", {
    store: true,
    checkAuth:undefined,
    isLogged:undefined,
    isSubscribed:undefined,
    createUser:user,
    updateUser:undefined,
    getAccessToken:undefined,
    deleteUser:undefined,
    logOut:undefined,
    unsubscribe:undefined,
    setStatus:undefined,
  });

  let component: SubscribeComponent;
  let fixture: ComponentFixture<SubscribeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[FormsModule,MatFormFieldModule,MatInputModule, AppModule],
      declarations: [SubscribeComponent],
      providers:[{provide:AuthService, useValue:fakeAuthService}]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubscribeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('SubscribeComponent is created', () => {
    expect(component).toBeTruthy();
  });

  it('user is retrieved', ()=> {
    let u = fakeAuthService.createUser(inputData);
    expect(u).toBeTruthy();
  });

  it('the user retrieved is the expected user', ()=> {
    expect(fakeAuthService.createUser(inputData)).toEqual(user);
  })
});
