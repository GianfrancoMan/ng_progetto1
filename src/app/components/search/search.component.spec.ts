import { ComponentFixture, TestBed, async, waitForAsync } from '@angular/core/testing';

import { SearchComponent } from './search.component';
import { DataService } from '../../services/data.service';
import { DataModule } from '../../data-module/data.module';
import { MatIcon } from '@angular/material/icon';
import { By } from '@angular/platform-browser';

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;


  let fakeDataService = jasmine.createSpyObj<DataService>("DataService", {isSearchAvailable:true});


  beforeEach(waitForAsync( () => {
    TestBed.configureTestingModule({
      imports:[DataModule],
      providers:[{provide:DataService, useValue:fakeDataService}],
    })
    .compileComponents().then(()=>{
      fixture = TestBed.createComponent(SearchComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
  }));

  it('SearchComponent is created', () => {
    expect(component).toBeTruthy();
  });

  it('search icon is displayed', ()=> {
    let el= fixture.nativeElement.querySelector('.search-container-form>mat-icon');
    expect(el.textContent).withContext('Expected icon code not found').toEqual('search');
    expect(el).withContext("Css class expected not found").toHaveClass('material-icons');
  });

  it('Radio button are not displayed', ()=>{
    component.isRadio = false;
    fixture.detectChanges();
    let radioGroupElements = fixture.debugElement.query(By.css('.search-container-form>mat-radio-group'));
    expect(radioGroupElements).toBeFalsy();
  });

  it('Radio button are correctly displayed', ()=>{
    component.isRadio = true;
    fixture.detectChanges();
    let radioGroupElements = fixture.debugElement.query(By.css('.search-container-form>mat-radio-group'));
    expect(radioGroupElements).toBeTruthy();
    let radioItemElem = fixture.debugElement.query(By.css('.search-container-form>mat-radio-group>mat-radio-button'));
    expect(radioItemElem.nativeElement.textContent).toBe('name');
  });
})
