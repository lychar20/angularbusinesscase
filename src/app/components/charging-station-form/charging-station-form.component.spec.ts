import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChargingStationFormComponent } from './charging-station-form.component';

describe('ChargingStationFormComponent', () => {
  let component: ChargingStationFormComponent;
  let fixture: ComponentFixture<ChargingStationFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChargingStationFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChargingStationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
