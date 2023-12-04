import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotifSidebarComponent } from './notif-sidebar.component';

describe('NotifSidebarComponent', () => {
  let component: NotifSidebarComponent;
  let fixture: ComponentFixture<NotifSidebarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NotifSidebarComponent]
    });
    fixture = TestBed.createComponent(NotifSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
