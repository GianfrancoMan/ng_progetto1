import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { AuthService } from '../../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AppModule } from '../../../app.module';
import { debounceTime } from 'rxjs';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { Auth } from '../../../../models/auth.model';

describe('LoginComponent', () => {

    const fakeAuthService = jasmine.createSpyObj<AuthService>("AuthService", {
    store: true,
    checkAuth:undefined,
    isLogged:undefined,
    isSubscribed:undefined,
    createUser:undefined,
    updateUser:undefined,
    getAccessToken:undefined,
    deleteUser:undefined,
    logOut:undefined,
    unsubscribe:undefined,
    setStatus:undefined,
  });
  let authService:any;
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let elem: DebugElement;

  beforeEach(async () => {

    await TestBed.configureTestingModule({
      imports:[FormsModule,MatFormFieldModule,MatInputModule, AppModule],
      declarations: [LoginComponent],
      providers:[{
        provide:AuthService, useValue:fakeAuthService,
      }],
    })
    .compileComponents().then( ()=> {
      fixture = TestBed.createComponent(LoginComponent);
      component = fixture.componentInstance;
      elem = fixture.debugElement;
      fixture.detectChanges();
    });

  });

  it('LoginComponent is created', () => {
    expect(component).toBeTruthy();
  });

  it('input label is displayed correctly', ()=> {
    const inputLabel = elem.query(By.css('mat-label'));
    expect(inputLabel.nativeElement.textContent).toEqual('Access Token (click on the link above to get your the access token)');
  })


});
