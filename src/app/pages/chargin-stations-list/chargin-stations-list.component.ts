import { Component, OnInit, inject } from '@angular/core';
import { ChargingStationService } from '../../services/chargingStation/charging-station.service';
import { ChargingStation } from '../../entities/charging.entity';
import { NgForOf } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-chargin-stations-list',
  standalone: true,
  imports: [NgForOf, RouterLink ] ,
  templateUrl: './chargin-stations-list.component.html',
  styleUrl: './chargin-stations-list.component.css'
})
export class CharginStationsListComponent implements OnInit {
  private readonly chargingStationService = inject(ChargingStationService);


  chargingStations: ChargingStation[];

  async ngOnInit(): Promise<void>  {
    this.chargingStations = await this.chargingStationService.findAllChargingStationsWithDetails();
    console.log(this.chargingStations);
    }


}
