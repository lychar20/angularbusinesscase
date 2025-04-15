import { Component, inject, Input, OnInit } from '@angular/core';
import { ChargingStationFormComponent } from '../../components/charging-station-form/charging-station-form.component';
import { NgIf } from '@angular/common';
import { ChargingStationService } from '../../services/chargingStation/charging-station.service';
import { Router } from '@angular/router';
import { ChargingStation, EditChargingStationInput } from '../../entities/charging.entity';

@Component({
  selector: 'app-edit-charging-station',
  standalone: true,
  imports: [NgIf, ChargingStationFormComponent ],
  templateUrl: './edit-charging-station.component.html',
  styleUrl: './edit-charging-station.component.css'
})
export class EditChargingStationComponent implements OnInit {
  private readonly chargingStationService: ChargingStationService = inject(ChargingStationService)
  private readonly router: Router = inject(Router)
  @Input({ required: true }) id: string;

  charging: ChargingStation


  async ngOnInit(): Promise <void> {
    this.charging = await this.chargingStationService.getById(this.id) 
    }


    async onChargingStationSubmitted(editChargingStationInput: EditChargingStationInput): Promise<void> {
      await this.chargingStationService.edit(this.id, editChargingStationInput)
      this.router.navigateByUrl('/dasboard')
      }

}
