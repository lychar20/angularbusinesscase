import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { AddChargingStationInput, ChargingStation, EditChargingStationInput } from '../../entities/charging.entity';
import { FormControl, FormGroup, Validators, FormArray,/*  AbstractControl, ValidatorFn, */ ReactiveFormsModule } from '@angular/forms';
import { NgForOf } from '@angular/common';
import { PowerService } from '../../services/power/power.service';
import { LocalisationService } from '../../services/localisation/localisation.service';
import { AddLocalisationgInput } from '../../entities/localisation.entity';
//import { AddHourlyRateInput } from '../../entities/hourlyRate.entity';
//import { HourtlyRateService } from '../../services/hourlyRate/hourtly-rate.service';
//import { Power } from '../../entities/power.entity';

@Component({
  selector: 'app-charging-station-form',
  standalone: true,
  imports: [ReactiveFormsModule, NgForOf],
  templateUrl: './charging-station-form.component.html',
  styleUrls: ['./charging-station-form.component.css']
})
export class ChargingStationFormComponent implements OnInit {
  @Input()chargingToEdit?: ChargingStation;
  @Input() localisations: any[] = [];
  @Input() powers: any[] = [];
  @Input() hourlyRates: any[] = [];
  @Output()formSubmitted: EventEmitter<AddChargingStationInput | EditChargingStationInput> = new EventEmitter();

  private readonly powerService: PowerService = inject(PowerService)
  private readonly localisationService: LocalisationService = inject(LocalisationService)
  //private readonly hourlyRateService: HourtlyRateService = inject(HourtlyRateService)


  form: FormGroup;


  ngOnInit(): void {
    this.form = new FormGroup({
      powerId: new FormControl('', Validators.required),
      name: new FormControl(this.chargingToEdit ? this.chargingToEdit.name : '', Validators.required),
      localisationId: new FormControl(''),
      streetNumber: new FormControl({ value: this.chargingToEdit ? this.chargingToEdit.localisation.streetNumber : '', disabled: true }, Validators.required),
      streetName: new FormControl({ value: this.chargingToEdit ? this.chargingToEdit.localisation.streetName : '', disabled: true }, Validators.required),
      latitude: new FormControl({ value: this.chargingToEdit ? this.chargingToEdit.localisation.latitude : '', disabled: true }, Validators.required),
      longitude: new FormControl({ value: this.chargingToEdit ? this.chargingToEdit.localisation.longitude : '', disabled: true }, Validators.required),
      zipCode: new FormControl({ value: this.chargingToEdit ? this.chargingToEdit.localisation.zipCode : '', disabled: true }, Validators.required),
      city: new FormControl({ value: this.chargingToEdit ? this.chargingToEdit.localisation.city : '', disabled: true }, Validators.required),
      accessDirectives: new FormControl(this.chargingToEdit ? this.chargingToEdit.accessDirectives : '', Validators.required),
      onFoot: new FormControl(this.chargingToEdit ? this.chargingToEdit.onFoot : false),
      manualPowerId: new FormControl({ value: '', disabled: true }),
    //  value: new FormControl('', Validators.required), 
    //  minimumDuration: new FormControl('', Validators.required)
     // hourlyRates: this.initHourlyRates() // Initialisation des taux horaires
    })
    this.setFieldsDisabled(false); 
    this.loadPowers();

  }

  async loadPowers() {
    try {
      this.powers = await this.powerService.list(); // Attendre la résolution de la promesse
    } catch (error) {
      console.error('Error fetching powers', error); // Gérer les erreurs ici
    }
  }


  initHourlyRates(): FormArray {
    const rates = this.chargingToEdit?.hourlyRates?.map(value => new FormGroup({
      value: new FormControl(value.value, Validators.required),
      minimumDuration: new FormControl(value.minimumDuration, Validators.required) // Ajoutez une validation requise pour chaque taux
    })) || [];
    
    return new FormArray(rates);
  }


/*   addHourlyRate() {
    const hourlyRates = this.form.get('hourlyRates') as FormArray;
    hourlyRates.push(new FormGroup({
      rate: new FormControl('', Validators.required)
    }));
  } */

  removeHourlyRate(index: number) {
    const hourlyRates = this.form.get('hourlyRates') as FormArray;
    hourlyRates.removeAt(index);
  }

  onLocalisationChange(event: any): void {
    const selectedId = event.target.value;
    const selectedLocalisation = this.localisations.find(loc => loc.id === +selectedId);
    if (selectedLocalisation) {
      // Remplit les champs avec les données de la localisation sélectionnée
      this.form.patchValue({
        streetNumber: selectedLocalisation.streetNumber,
        streetName: selectedLocalisation.streetName,
        latitude: selectedLocalisation.latitude,
        longitude: selectedLocalisation.longitude,
        zipCode: selectedLocalisation.zipCode,
        city: selectedLocalisation.city
      });
      // Désactivez les champs si une localisation est sélectionnée
      this.setFieldsDisabled(true);
    } else {
      // Activez les champs pour la saisie manuelle
      this.setFieldsDisabled(false);
      this.form.patchValue({
        streetNumber: '',
        streetName: '',
        latitude: '',
        longitude: '',
        zipCode: '',
        city: ''
      });
    }
  }


  onPowerChange(event: any): void {
    const selectedId = event.target.value;
    if (selectedId) {
      // Si un Power ID est sélectionné, désactiver le champ de saisie manuelle et vider sa valeur
      this.form.get('manualPowerId')?.disable();
      this.form.patchValue({ manualPowerId: '' });
    } else {
      // Si aucun Power ID n'est sélectionné, activer le champ de saisie manuelle
      this.form.get('manualPowerId')?.enable();
    }
  }


/*   setFieldsDisabled(disabled: boolean): void {
    if (disabled) {
      this.form.get('streetNumber')?.disable();
      this.form.get('streetName')?.disable();
      this.form.get('latitude')?.disable();
      this.form.get('longitude')?.disable();
      this.form.get('zipCode')?.disable();
      this.form.get('city')?.disable();
    } else {
      this.form.get('streetNumber')?.enable();
      this.form.get('streetName')?.enable();
      this.form.get('latitude')?.enable();
      this.form.get('longitude')?.enable();
      this.form.get('zipCode')?.enable();
      this.form.get('city')?.enable();
    }
  }
 */

  setFieldsDisabled(disabled: boolean): void {
    // Activer ou désactiver les champs de localisation
    const fields = [
      'streetNumber', 'streetName', 'latitude', 'longitude', 'zipCode', 'city', 'manualPowerId'
    ];
    fields.forEach(field => {
      if (disabled) {
        this.form.get(field)?.disable();
      } else {
        this.form.get(field)?.enable();
      }
    });
  }



/*   async onChargingStationSubmitted() {
    if (this.form.valid) {
        const formData: AddChargingStationInput | EditChargingStationInput = this.form.value;
        this.formSubmitted.emit(formData); // Émettez l'événement avec les données du formulaire
    } else {
        console.log("Form is invalid", this.form.errors); // Vérifiez les erreurs de formulaire
        // Affichez également l'état de chaque contrôle
        Object.values(this.form.controls).forEach(control => {
            console.log(control.errors);
        });
    }
} */


async onChargingStationSubmitted() {
  if (this.form.valid) {
      // Vérifiez si une localisation a été sélectionnée
      const localisationId = this.form.get('localisationId')?.value;
      let localisation;

      // Si aucune localisation n'est sélectionnée, créer une nouvelle localisation
      if (!localisationId) {
          const newLocalisation: AddLocalisationgInput = {
              streetNumber: this.form.get('streetNumber')?.value,
              streetName: this.form.get('streetName')?.value,
              latitude: this.form.get('latitude')?.value,
              longitude: this.form.get('longitude')?.value,
              zipCode: this.form.get('zipCode')?.value,
              city: this.form.get('city')?.value
          };

          try {
              // Appel pour créer la nouvelle localisation
              localisation = await this.localisationService.create(newLocalisation);
          } catch (error) {
              console.error('Error creating localisation', error);
              return; // Arrêter le traitement si la création de localisation échoue
          }
      } else {
          // Une localisation existante est sélectionnée, vous pouvez également récupérer ses détails si nécessaire
          localisation = { id: localisationId }; // Vous pouvez récupérer plus de détails si souhaité
      }

      // Préparer les données du formulaire comprenant la localisation
      const formData: AddChargingStationInput | EditChargingStationInput = {
          ...this.form.value,
          localisation: localisation // Joindre la localisation créée ou référencée
      };


      // Vérifier si les champs hourlyRate sont remplis
/*       const hourlyRateValue = this.form.get('value')?.value;
      const minimumDuration = this.form.get('minimumDuration')?.value;

      if (hourlyRateValue && minimumDuration) {
          const newHourlyRate: AddHourlyRateInput = {
              value: hourlyRateValue,
              minimumDuration: minimumDuration
          };

          try {
              // Appel pour créer le nouveau tarif horaire
              await this.hourlyRateService.create(newHourlyRate);
          } catch (error) {
              console.error('Error creating hourly rate', error);
              return; // Arrêter le traitement si la création de tarif échoue
          }
      } */



      this.formSubmitted.emit(formData); // Émettez l'événement avec les données du formulaire
  } else {
      console.log("Form is invalid", this.form.errors); // Vérifiez les erreurs de formulaire
      // Affichez également l'état de chaque contrôle
      Object.values(this.form.controls).forEach(control => {
          console.log(control.errors);
      });
  }
}




  }

