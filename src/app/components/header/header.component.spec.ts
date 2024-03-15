import { ComponentFixture, TestBed, fakeAsync, flushMicrotasks, waitForAsync } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import { DataService } from '../../services/data.service';
import { AuthService } from '../../services/auth.service';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { MatIconModule } from '@angular/material/icon';

describe('HeaderComponent', () => {

  const fakeDataService = jasmine.createSpyObj<DataService>("DataService", ['setViewName']);

  const fakeAuthService = jasmine.createSpyObj<AuthService>("AuthService", {isLogged:true});

  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let element:DebugElement;
  let authService:any;

  beforeEach(waitForAsync( () => {
    TestBed.configureTestingModule({
      imports:[MatIconModule],
      providers:[
        {provide:DataService, useValue:fakeDataService},
        {provide:AuthService, useValue:fakeAuthService},
      ],
      declarations: [HeaderComponent]
    })
    .compileComponents().then( ()=>{
      fixture = TestBed.createComponent(HeaderComponent);
      component = fixture.componentInstance;
      element = fixture.debugElement;
      fixture.detectChanges();

      authService = TestBed.inject(AuthService);
    });

  }));

  it('HeaderComponent is created', waitForAsync(() => {
    fixture.whenStable().then(()=>{
      expect(component).toBeTruthy();
    })
  }));


  it('Header links are displayed',  waitForAsync( ()=>{
    component.authService.isLogged;

    let linksElements =  element.queryAll(By.css('.btn-header'));
    console.log(linksElements);
    expect(linksElements.length).toEqual(4);
  }));
});
