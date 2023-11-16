import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OldUserLoginComponent } from './old-user-login.component';

describe('OldUserLoginComponent', () => {
  let component: OldUserLoginComponent;
  let fixture: ComponentFixture<OldUserLoginComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OldUserLoginComponent]
    });
    fixture = TestBed.createComponent(OldUserLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
