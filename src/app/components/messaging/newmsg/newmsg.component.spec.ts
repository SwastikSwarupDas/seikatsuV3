import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewmsgComponent } from './newmsg.component';

describe('NewmsgComponent', () => {
  let component: NewmsgComponent;
  let fixture: ComponentFixture<NewmsgComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewmsgComponent]
    });
    fixture = TestBed.createComponent(NewmsgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
