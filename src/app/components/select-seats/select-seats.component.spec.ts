import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectSeatsComponent } from './select-seats.component';

describe('SelectSeatsComponent', () => {
  let component: SelectSeatsComponent;
  let fixture: ComponentFixture<SelectSeatsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectSeatsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectSeatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

    // it('should create', () => {
    //   expect(component).toBeTruthy();
    // });
});
