import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PassengerformComponent } from './passengerform.component';

describe('PassengerformComponent', () => {
  let component: PassengerformComponent;
  let fixture: ComponentFixture<PassengerformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PassengerformComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PassengerformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
