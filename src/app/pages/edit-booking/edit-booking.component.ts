import { Component, inject, Input, OnInit } from '@angular/core';
import { BookingFormComponent } from '../../components/booking-form/booking-form.component';
import { BookingService } from '../../services/booking/booking.service';
import { Router } from '@angular/router';
import { Booking, EditBookingInput } from '../../entities/booking.entity';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-edit-booking',
  standalone: true,
  imports: [BookingFormComponent, NgIf],
  templateUrl: './edit-booking.component.html',
  styleUrl: './edit-booking.component.css'
})
export class EditBookingComponent implements OnInit {
  private readonly bookingService: BookingService = inject(BookingService)
  private readonly router: Router = inject(Router)
  @Input({ required: true }) id: string;

  booking: Booking

  async ngOnInit(): Promise <void> {
     this.booking = await this.bookingService.getById(this.id) 
    }



  async onBookingSubmitted(editBookingInput: EditBookingInput): Promise<void> {
      await this.bookingService.edit(this.id, editBookingInput)
      this.router.navigateByUrl('/dasboard')
    }



}
