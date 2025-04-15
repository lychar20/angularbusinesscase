import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HourlyRateFormComponent } from './hourly-rate-form.component';

describe('HourlyRateFormComponent', () => {
  let component: HourlyRateFormComponent;
  let fixture: ComponentFixture<HourlyRateFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HourlyRateFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HourlyRateFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
