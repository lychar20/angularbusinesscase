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
    uuid: string;
    accessDirectives: string;
    name: string;
    onFoot: boolean;
    localisation: Localisation;
    power: number;
}

export interface EditChargingStationInput {
    uuid: string;
    accessDirectives: string;
    name: String;
    onFoot: boolean;
    localisation: Localisation;
    power: number;
}