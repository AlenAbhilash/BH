import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IEPSIDERBARComponent } from './iep-siderbar.component';

describe('IEPSIDERBARComponent', () => {
  let component: IEPSIDERBARComponent;
  let fixture: ComponentFixture<IEPSIDERBARComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IEPSIDERBARComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IEPSIDERBARComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
