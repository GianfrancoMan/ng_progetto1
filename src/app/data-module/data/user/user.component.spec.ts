import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { UserComponent } from './user.component';
import { DataModule } from '../../data.module';
import { RouterTestingModule } from '@angular/router/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { getMockUser } from '../../../utils/testing-utility/moks';
import { of } from 'rxjs';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('UserComponent', () => {
  let component: UserComponent;
  let fixture: ComponentFixture<UserComponent>;
  let elem: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[DataModule, RouterTestingModule, NoopAnimationsModule],
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserComponent);
    component = fixture.componentInstance;
    elem = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', waitForAsync(() => {
    fixture.detectChanges();
    fixture.whenStable().then( ()=> {
      expect(component).toBeTruthy();
    });
  }));

  it('should create', waitForAsync(() => {
    component.user = of(getMockUser(2));
    fixture.detectChanges();
    fixture.whenStable().then( ()=> {
      const detailsElem = elem.queryAll(By.css('.details-value'));
      component.user.subscribe( u => {
        expect(detailsElem.length).toEqual(4);
        expect(detailsElem[0].nativeElement.textContent).toEqual(u.name);
        expect(detailsElem[1].nativeElement.textContent).toEqual(u.email);
        expect(detailsElem[2].nativeElement.textContent).toEqual(u.status);
        expect(detailsElem[3].nativeElement.textContent).toEqual(u.gender);
      })
    })
  }));
});
