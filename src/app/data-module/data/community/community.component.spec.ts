import { ComponentFixture, TestBed, fakeAsync, flush, flushMicrotasks, tick, waitForAsync } from '@angular/core/testing';

import { CommunityComponent } from './community.component';
import { User } from '../../../../models/user.model';
import { getMockUsers, getMockUser } from '../../../utils/testing-utility/moks';
import { DataService } from '../../../services/data.service';
import { DataModule } from '../../data.module';
import { Observable, of, tap, finalize } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

const users:User[] = getMockUsers();

describe('CommunityComponent', () => {
  let component: CommunityComponent;
  let fixture: ComponentFixture<CommunityComponent>;
  let elem:DebugElement;
  const dataServiceSpy = jasmine.createSpyObj<DataService>("DataService", {getUsers: of(getMockUsers()), isSearchAvailable:true});
  let dataService: any;

  beforeEach(waitForAsync (waitForAsync(() => {
    TestBed.configureTestingModule({
      imports:[DataModule, RouterTestingModule, BrowserAnimationsModule],
      providers:[
        {provide:DataService, useValue:dataServiceSpy},
      ]
    })
    .compileComponents().then( ()=> {
      fixture = TestBed.createComponent(CommunityComponent);
      component = fixture.componentInstance;
      elem = fixture.debugElement;

      dataService = TestBed.inject(DataService) as jasmine.SpyObj<DataService>;
      fixture.detectChanges();
    });
  })));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('search section is present', ()=> {
    const searchElem = elem.query(By.css('app-search'));
    expect(searchElem).toBeTruthy();
  })

  it('search button is displayed correctly', ()=> {
    const searchElem = elem.query(By.css('button'));
    expect(searchElem).toBeTruthy();
    expect(searchElem.nativeElement.textContent).toEqual('Go')
  })


  it('pagination section is present', ()=> {
    const paginationElem = elem.query(By.css('app-pagination'));
    expect(paginationElem).toBeTruthy();
  })


  it('user are displayed', fakeAsync(()=> {
    component.users = dataService.getUsers();
    component.isSpinnerActive = false;
    fixture.detectChanges();
    const cards = elem.queryAll(By.css('.cards'));
    expect(cards).toBeTruthy();
    expect(cards.length).toBeGreaterThan(0);
    flush();
  }));

})
