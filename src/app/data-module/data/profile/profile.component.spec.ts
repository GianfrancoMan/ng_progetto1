import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileComponent } from './profile.component';
import { DataModule } from '../../data.module';
import { RouterTestingModule } from '@angular/router/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { DataService } from '../../../services/data.service';
import { AuthService } from '../../../services/auth.service';

describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;
  let elem:DebugElement;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[DataModule, RouterTestingModule, NoopAnimationsModule],
    })
    .compileComponents().then(()=>{
      fixture = TestBed.createComponent(ProfileComponent);
      component = fixture.componentInstance;
      elem = fixture.debugElement;
      fixture.detectChanges();
    });

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('tab group are displayed', ()=> {
    const tabGroupElem = elem.query(By.css('mat-tab-group'));
    expect(tabGroupElem).toBeTruthy();
  })
});
