import { ComponentFixture, TestBed, fakeAsync, flush, waitForAsync } from '@angular/core/testing';

import { UserComponent } from './user.component';
import { DataModule } from '../../data.module';
import { RouterTestingModule } from '@angular/router/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { getMockUser } from '../../../utils/testing-utility/moks';
import { of, tap } from 'rxjs';
import { DebugElement, inject } from '@angular/core';
import { By } from '@angular/platform-browser';
import { DataService } from '../../../services/data.service';
import { PostsComponent } from '../../../components/posts/posts.component';

describe('UserComponent', () => {
  let component: UserComponent;
  let fixture: ComponentFixture<UserComponent>;
  let elem: DebugElement;
  let dataService:any;

  beforeEach(waitForAsync (() => {
    let dataServiceSpy = jasmine.createSpyObj<DataService>("DataService", ['getUserById', 'getComments', 'getUserPosts', 'getPosts']);
    TestBed.configureTestingModule({
      imports:[DataModule, RouterTestingModule, NoopAnimationsModule],
      declarations:[PostsComponent],
      providers:[
        {provide:DataService, useValue:dataServiceSpy}
      ],
    })
    .compileComponents().then(()=>{
      fixture = TestBed.createComponent(UserComponent);
      component = fixture.componentInstance;
      elem = fixture.debugElement;
    });

  }));

  it('should create',() => {
    expect(component).toBeTruthy();
  });

  it('user is correctly displayed', fakeAsync(() => {
    dataService = TestBed.inject(DataService);
    component.user = dataService.getUserById.and.returnValue(of(getMockUser(2)));
    expect(component.user).toBeTruthy();
    flush();
  }));

  it('tabs group is displayed',fakeAsync(()=> {
    component.user = of(getMockUser(2));
    component.user.subscribe(u=> {
      expect(u.name).toBe("Binco Ballino");
    })
    flush();
  }));

});
