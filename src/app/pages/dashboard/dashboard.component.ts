import { Component, inject, OnInit } from '@angular/core';
import { BookingService } from '../../services/booking/booking.service';
import { Booking } from '../../entities/booking.entity';
import { NgForOf, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ChargingStationService } from '../../services/chargingStation/charging-station.service';
import { ChargingStation } from '../../entities/charging.entity';
//import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NgForOf, NgIf, RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  private readonly bookingService = inject(BookingService)
  private readonly chargingStationService = inject(ChargingStationService)
  //private readonly router = inject(Router)

  bookings: Booking[] = [];
  futureBookings: Booking[] = [];
  anteriorBookings: Booking[] = [];
  chargingStationsWithHourlyRateNulls: ChargingStation[] = [];


    async ngOnInit(): Promise<void>  {
      this.bookings = await this.bookingService.findBookingsWithUserLocalisation();
      this.futureBookings = await this.bookingService.findFutureBookings();
      this.anteriorBookings = await this.bookingService.findAnteriorBookings();
      this.chargingStationsWithHourlyRateNulls = await this.chargingStationService.findChargingStationWithHourlyRateNUll()

      console.log('Current Bookings:', this.bookings);
      console.log('Future Bookings:', this.futureBookings);
      console.log('Anterior Bookings:', this.anteriorBookings);

      }



      async onClickDelete(uuid: string): Promise<void> {
        const confirmation = confirm("Êtes-vous sûr de vouloir supprimer cette réservation ?");
        if (!confirmation) {
          return;
        }
        
        try {
            await this.bookingService.delete(uuid);
            this.futureBookings = this.futureBookings.filter(booking => booking.uuid !== uuid);
            console.log(`Réservation avec ID ${uuid} supprimée`);
        } catch (error) {
            console.error('Erreur lors de la suppression de la réservation:', error);
        }
      }


}
