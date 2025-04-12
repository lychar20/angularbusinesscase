import { Component, inject, Input, } from '@angular/core';
import { BookingService } from '../../services/booking/booking.service';
import { Router} from '@angular/router';
import { AddBookingInput } from '../../entities/booking.entity';
import { BookingFormComponent } from '../../components/booking-form/booking-form.component';

import { ReactiveFormsModule } from '@angular/forms';



@Component({
  selector: 'app-add-booking',
  standalone: true,
  imports: [ReactiveFormsModule,BookingFormComponent],
  templateUrl: './add-booking.component.html',
  styleUrls: ['./add-booking.component.css']
})
export class AddBookingComponent {
  private readonly bookingService: BookingService = inject(BookingService)
  private readonly router = inject(Router)


  @Input({ required: true}) id: string;




  async onBookingSubmitted(addBookingInput: AddBookingInput): Promise<void> {
    console.log("Received booking input:", addBookingInput); // Log des données reçues
    try {
        await this.bookingService.create(this.id, addBookingInput);
        console.log("Booking created successfully"); // Confirmer que la réservation a été créée
        this.router.navigateByUrl('/dasboard');
    } catch (error) {
        console.error('Error creating booking:', error); // Log des erreurs potentielles
    }
}


}
