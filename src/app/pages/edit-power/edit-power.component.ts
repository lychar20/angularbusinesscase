import { Component, inject, Input, numberAttribute, OnInit } from '@angular/core';
import { PowerService } from '../../services/power/power.service';
import { EditPowerInput, Power } from '../../entities/power.entity';
import { Router } from '@angular/router';
import { PowerFormComponent } from "../../components/power-form/power-form.component";

@Component({
  selector: 'app-edit-power',
  standalone: true,
  imports: [PowerFormComponent],
  templateUrl: './edit-power.component.html',
  styleUrl: './edit-power.component.css'
})
export class EditPowerComponent implements OnInit {
  private readonly powerService: PowerService = inject(PowerService)
  private readonly router: Router = inject(Router)
  @Input({transform: numberAttribute})id : number

  power: Power

async ngOnInit(): Promise <void> {
  this.power = await this.powerService.getById(this.id) 
}

async onPowerSubmitted(editPowerInput: EditPowerInput): Promise<void> {
  await this.powerService.edit(this.id, editPowerInput)
  this.router.navigateByUrl('/power/list')
}

}
