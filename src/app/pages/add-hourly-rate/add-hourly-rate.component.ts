import { Component, inject, Input } from '@angular/core';
import { HourlyRateFormComponent } from "../../components/hourly-rate-form/hourly-rate-form.component";
import { HourtlyRateService } from '../../services/hourlyRate/hourtly-rate.service';
import { Router } from '@angular/router';
import { AddHourlyRateInput } from '../../entities/hourlyRate.entity';



@Component({
  selector: 'app-add-hourly-rate',
  standalone: true,
  imports: [HourlyRateFormComponent],
  templateUrl: './add-hourly-rate.component.html',
  styleUrls: ['./add-hourly-rate.component.css']
})
export class AddHourlyRateComponent {
  private readonly hourlyRateService: HourtlyRateService = inject(HourtlyRateService)
  private readonly router = inject(Router)

  @Input({ required: true }) id: string;



  async onHourlyRateSubmitted(addHourlyRateInput: AddHourlyRateInput): Promise<void> {


    console.log("Received hourlyRate input:", addHourlyRateInput); // Log des données reçues
    try {
      await this.hourlyRateService.create(this.id, addHourlyRateInput);
        console.log(this.id);
        console.log("HourlyRate created successfully"); // Confirmer que la réservation a été créée
      this.router.navigateByUrl('/chargin-stations-list');
    } catch (error) {
      console.error('Error creating booking:', error); // Log des erreurs potentielles
    }


  }


}
