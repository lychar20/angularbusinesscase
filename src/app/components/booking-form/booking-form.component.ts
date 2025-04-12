import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AddBookingInput, Booking, EditBookingInput } from '../../entities/booking.entity';
import { FormControl, FormGroup, Validators, AbstractControl, ValidatorFn, ReactiveFormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-booking-form',
  standalone: true,
  imports: [NgIf, ReactiveFormsModule ],
  templateUrl: './booking-form.component.html',
  styleUrls: ['./booking-form.component.css']
})
export class BookingFormComponent implements OnInit {
  @Input()bookingToEdit?: Booking;
  @Output()formSubmitted: EventEmitter<AddBookingInput | EditBookingInput> = new EventEmitter();

  form: FormGroup;

  ngOnInit(): void {
    this.form = new FormGroup({
      startedAt: new FormControl(this.bookingToEdit ? this.bookingToEdit.startedAt : '', Validators.required),
      finishedAt: new FormControl(this.bookingToEdit ? this.bookingToEdit.finishedAt : '', Validators.required),
    }, { validators: this.dateRangeValidator }); // Utilisation de la méthode de validation personnalisée
  }

  dateRangeValidator: ValidatorFn = (group: AbstractControl): { [key: string]: any } | null => {
    const startedAt = group.get('startedAt')?.value;
    const finishedAt = group.get('finishedAt')?.value;
    
    if (finishedAt && startedAt && new Date(finishedAt) <= new Date(startedAt)) {
        return { dateInvalid: true }; // Retourne une erreur si les dates ne sont pas valides
    }
    return null; // Valide
};


async onBookingSubmitted() {
  if (this.form.valid) {
    const formData: AddBookingInput = {
      startedAt: this.form.value.startedAt,
      finishedAt: this.form.value.finishedAt,
    };
    console.log("Form data submitted:", formData); 
    this.formSubmitted.emit(formData); // Émettez l'événement
  } else {
    console.log("Form is invalid", this.form.errors); // Log des erreurs de formulaire
  }
}


}