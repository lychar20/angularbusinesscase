import { Localisation } from './localisation.entity';
import { HourlyRate } from './hourlyRate.entity';
import { Power } from './power.entity';

export interface ChargingStation {
    uuid: string;
    accessDirectives: string;
    createdAt: Date;
    name: string;
    onFoot: boolean;
    updatedAt: Date;
    
    power: Power;

    localisation: Localisation; 
    hourlyRates: HourlyRate[]

}

export interface AddChargingStationInput {
    accessDirectives: string;
    name: string;
    onFoot: boolean;
    localisation: Localisation;
    hourlyRates: HourlyRate[]
    power: Power;
}

export interface EditChargingStationInput {
    accessDirectives: string;
    name: string;
    onFoot: boolean;
    localisation: Localisation;
    hourlyRates: HourlyRate[]
    power: Power;
}