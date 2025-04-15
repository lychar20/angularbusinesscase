import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddChargingStationComponent } from './add-charging-station.component';

describe('AddChargingStationComponent', () => {
  let component: AddChargingStationComponent;
  let fixture: ComponentFixture<AddChargingStationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddChargingStationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddChargingStationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
