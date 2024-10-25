import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomieComponent } from './homie.component';

describe('HomieComponent', () => {
  let component: HomieComponent;
  let fixture: ComponentFixture<HomieComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomieComponent]
    });
    fixture = TestBed.createComponent(HomieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
