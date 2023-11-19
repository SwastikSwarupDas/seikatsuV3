import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElitesComponent } from './elites.component';

describe('ElitesComponent', () => {
  let component: ElitesComponent;
  let fixture: ComponentFixture<ElitesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ElitesComponent]
    });
    fixture = TestBed.createComponent(ElitesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
