import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharginStationsListComponent } from './chargin-stations-list.component';

describe('CharginStationsListComponent', () => {
  let component: CharginStationsListComponent;
  let fixture: ComponentFixture<CharginStationsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CharginStationsListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CharginStationsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
