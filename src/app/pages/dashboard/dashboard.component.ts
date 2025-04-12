import { Component, inject, OnInit } from '@angular/core';
import { BookingService } from '../../services/booking/booking.service';
import { Booking } from '../../entities/booking.entity';
import { NgForOf, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NgForOf, NgIf, RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  private readonly bookingService = inject(BookingService)

  bookings: Booking[] = [];
  futureBookings: Booking[] = [];
  anteriorBookings: Booking[] = [];


    async ngOnInit(): Promise<void>  {
      this.bookings = await this.bookingService.findBookingsWithUserLocalisation();
      this.futureBookings = await this.bookingService.findFutureBookingsWithUserLocalisation();
      this.anteriorBookings = await this.bookingService.findAnteriorBookingsWithUserLocalisation();

      console.log('Current Bookings:', this.bookings);
      console.log('Future Bookings:', this.futureBookings);
      console.log('Anterior Bookings:', this.anteriorBookings);

      }





}
