import { ComponentFixture, TestBed, fakeAsync, tick, waitForAsync } from '@angular/core/testing';

import { PostsComponent } from './posts.component';
import { DataService } from '../../services/data.service';
import { AuthService } from '../../services/auth.service';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { DataModule } from '../../data-module/data.module';
import { getMockPosts } from '../../utils/testing-utility/moks';
import { of } from 'rxjs';
import { SearchComponent } from '../search/search.component';
import { By } from '@angular/platform-browser';


describe('PostsComponent', () => {
  let component: PostsComponent;
  let fixture: ComponentFixture<PostsComponent>;
  let elem:DebugElement;

  beforeEach(waitForAsync(()=> {

    TestBed.configureTestingModule({
      declarations:[SearchComponent],
      imports:[
        BrowserAnimationsModule,
        RouterTestingModule,
        DataModule,
      ],
      schemas:[NO_ERRORS_SCHEMA],
    }).compileComponents()
      .then(()=> {
        fixture = TestBed.createComponent(PostsComponent);
        component = fixture.componentInstance;
        elem = fixture.debugElement;
        fixture.detectChanges();
      });

  }));

   it('PostComponent is created', () => {
    expect(component).toBeTruthy();
   });

   it('edit section is not displayed', waitForAsync(()=>{
    component.isEditable = false;
    fixture.detectChanges();
    fixture.whenStable().then(()=>{
      fixture.detectChanges();
      const editElem = elem.query(By.css('.cards-thought'));
      expect(editElem).toBeFalsy();
    });
   }));


   it('edit section is displayed', waitForAsync(()=>{
    component.isEditable = true;
    fixture.detectChanges();
    fixture.whenStable().then(()=>{
      const editElem = elem.query(By.css('.cards-thought'));
      expect(editElem).toBeTruthy();
    });
   }));


   it('spinner is displayed', waitForAsync(()=>{
    component.isSpinnerActive = true;
    fixture.detectChanges();
    fixture.whenStable().then(()=>{
      const spinnerElem = elem.query(By.css('mat-spinner'));
      expect(spinnerElem).toBeTruthy();
    });
   }));


   it('spinner is not displayed', waitForAsync(()=>{
    component.isSpinnerActive = false;
    fixture.detectChanges();
    fixture.whenStable().then(()=>{
      const spinnerElem = elem.query(By.css('mat-spinner'));
      expect(spinnerElem).toBeFalsy();
    });
   }));


  it('posts are displayed correctly', waitForAsync(()=>{
    component.posts = of(getMockPosts());
    fixture.detectChanges();
    fixture.whenStable().then(()=>{
      const cardsElem = elem.queryAll(By.css('.card'));
      const contentsElem  = elem.queryAll(By.css('mat-card-content'));
      component.posts.subscribe( p => {
        expect(cardsElem).toBeTruthy();
        expect(cardsElem.length).toEqual(p.length);
        expect(contentsElem[0].nativeElement.textContent.trim()).toEqual(p[0].body);
        });
      });
   }));

   it('comment section is displayed after click', waitForAsync(()=>{
    component.doComment = false;
    fixture.detectChanges();
    fixture.whenStable().then(()=>{
      const buttonElem = elem.query(By.css('#comment_btn'));
      const formElem = elem.query(By.css('#form_section'));
      setTimeout(()=>{
        buttonElem.nativeElement.click();
        fixture.detectChanges();
        expect(component.doComment).toBe(true);
      },3000)
    });
   }));

});
