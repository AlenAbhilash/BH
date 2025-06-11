import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IEPDashboardComponent } from './iep-dashboard.component';

describe('IEPDashboardComponent', () => {
  let component: IEPDashboardComponent;
  let fixture: ComponentFixture<IEPDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IEPDashboardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IEPDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
