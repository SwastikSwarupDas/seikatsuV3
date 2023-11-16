import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadpropertyformComponent } from './uploadpropertyform.component';

describe('UploadpropertyformComponent', () => {
  let component: UploadpropertyformComponent;
  let fixture: ComponentFixture<UploadpropertyformComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UploadpropertyformComponent]
    });
    fixture = TestBed.createComponent(UploadpropertyformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
