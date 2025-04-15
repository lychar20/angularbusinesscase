import { Component, inject } from '@angular/core';
import { ChargingStationService } from '../../services/chargingStation/charging-station.service';
import { Router } from '@angular/router';
import { AddChargingStationInput } from '../../entities/charging.entity';
import { ChargingStationFormComponent } from '../../components/charging-station-form/charging-station-form.component';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-charging-station',
  standalone: true,
  imports: [ReactiveFormsModule, ChargingStationFormComponent ],
  templateUrl: './add-charging-station.component.html',
  styleUrl: './add-charging-station.component.css'
})
export class AddChargingStationComponent {
  private readonly chargingStationService: ChargingStationService = inject(ChargingStationService)
  private readonly router = inject(Router)


  async onChargingStationSubmitted(addChargingStationInput: AddChargingStationInput):Promise <void> {
    await this.chargingStationService.create(addChargingStationInput)
    this.router.navigateByUrl('/dasboard')
    } 


}
