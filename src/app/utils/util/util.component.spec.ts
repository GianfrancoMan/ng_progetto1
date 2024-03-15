import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UtilComponent } from './util.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('UtilComponent', () => {
  let component: UtilComponent;
  let fixture: ComponentFixture<UtilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[RouterTestingModule],
      declarations: [UtilComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UtilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
