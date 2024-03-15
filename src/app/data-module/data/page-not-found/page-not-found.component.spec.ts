import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PageNotFoundComponent } from './page-not-found.component';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from '../../../services/auth.service';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('PageNotFoundComponent', () => {
  let component: PageNotFoundComponent;
  let fixture: ComponentFixture<PageNotFoundComponent>;
  let elem:DebugElement;
  let authServiceSpy = jasmine.createSpyObj<AuthService>("AuthService", ['logOut'])
  let authServiceStub:any ;

  beforeEach(waitForAsync( () => {
    TestBed.configureTestingModule({
     imports:[RouterTestingModule],
     providers:[{provide:AuthService, useValue:authServiceSpy}]
    })
    .compileComponents().then(()=>{
      fixture = TestBed.createComponent(PageNotFoundComponent);
      component = fixture.componentInstance;
      elem = fixture.debugElement;

      authServiceStub = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    });

  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Expect text is displayed correctly', ()=>{
    let headerElem = elem.query(By.css('h1'));
    expect(headerElem.nativeElement.textContent).toEqual('Ops!!');
    headerElem = elem.query(By.css('h2'));
    expect(headerElem.nativeElement.textContent).toEqual('Something was wrong.');
  });

});
