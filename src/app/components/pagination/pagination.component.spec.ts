import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PaginationComponent } from './pagination.component';
import { MatIconModule } from '@angular/material/icon';

describe('PaginationComponent', () => {
  let component: PaginationComponent;
  let fixture: ComponentFixture<PaginationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PaginationComponent],
      imports:[MatIconModule],
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaginationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('the page number is incremented by 10',()=> {
    component.page = 1;
    component.nextPage('nextMore');
    expect(component.page).toEqual(11);
  })

  it('the page number is incremented by 1',()=> {
    component.page = 1;
    component.nextPage('next');
    expect(component.page).toEqual(2);
  })

  it('the page number is decremented by 1',()=> {
    component.page = 23;
    component.nextPage('prev');
    expect(component.page).toEqual(22);
  })

  it('the page number is decremented by 1',()=> {
    component.page = 23;
    component.nextPage('prevMore');
    expect(component.page).toEqual(13);
  })
});
