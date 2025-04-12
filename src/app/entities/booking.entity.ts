import { Localisation } from "./localisation.entity";

export interface Booking {

    startedAt: Date;
    finishedAt: Date;
    totalAmount: number;
    localisation: Localisation
   
}


export interface AddBookingInput {

    startedAt: string;
    finishedAt: string;

}

export interface EditBookingInput {

    startedAt: string;
    finishedAt: string;

}