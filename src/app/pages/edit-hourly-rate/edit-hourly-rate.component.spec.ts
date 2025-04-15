import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditHourlyRateComponent } from './edit-hourly-rate.component';

describe('EditHourlyRateComponent', () => {
  let component: EditHourlyRateComponent;
  let fixture: ComponentFixture<EditHourlyRateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditHourlyRateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditHourlyRateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
