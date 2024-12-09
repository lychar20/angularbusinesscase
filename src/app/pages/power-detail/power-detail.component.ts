import { Component, inject, Input, numberAttribute } from '@angular/core';
import { PowerService } from '../../services/power/power.service';
import { Power } from '../../entities/power.entity';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-power-detail',
  standalone: true,
  imports: [NgIf],
  templateUrl: './power-detail.component.html',
  styleUrl: './power-detail.component.css'
})
export class PowerDetailComponent {
  private readonly powerService: PowerService = inject(PowerService)
  @Input({transform: numberAttribute})id : number

  power: Power

  async ngOnInit(): Promise <void> {
    this.power = await this.powerService.getById(this.id) 
  }

}
