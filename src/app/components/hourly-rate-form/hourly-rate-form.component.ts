import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AddHourlyRateInput, EditHourlyRateInput, HourlyRate } from '../../entities/hourlyRate.entity';
import { FormControl, FormGroup, Validators, /* AbstractControl, ValidatorFn,*/ ReactiveFormsModule  } from '@angular/forms';

@Component({
  selector: 'app-hourly-rate-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './hourly-rate-form.component.html',
  styleUrls: ['./hourly-rate-form.component.css']
})
export class HourlyRateFormComponent implements OnInit {
  @Input()hourlyRateToEdit?: HourlyRate;
  @Output()formSubmitted: EventEmitter<AddHourlyRateInput | EditHourlyRateInput> = new EventEmitter();


  form: FormGroup;

  ngOnInit(): void {
        this.form = new FormGroup({
          value: new FormControl('', Validators.required), 
          minimumDuration: new FormControl('', Validators.required)
        })
  }

  async onHourlyRateSubmitted() {
    if (this.form.valid) {
      const formData: AddHourlyRateInput = {
      value: this.form.value.value,
      minimumDuration: this.form.value.minimumDuration,
      };
      console.log("Form data submitted:", formData); 
      this.formSubmitted.emit(formData); // Émettez l'événement
      } else {
      console.log("Form is invalid", this.form.errors); // Log des erreurs de formulaire
      }

  }


}
