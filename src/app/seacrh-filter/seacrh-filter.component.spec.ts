import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeacrhFilterComponent } from './seacrh-filter.component';

describe('SeacrhFilterComponent', () => {
  let component: SeacrhFilterComponent;
  let fixture: ComponentFixture<SeacrhFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SeacrhFilterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SeacrhFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
