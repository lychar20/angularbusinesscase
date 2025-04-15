import { Localisation } from "./localisation.entity";

export interface Booking {

    uuid: string;
    startedAt: Date;
    finishedAt: Date;
    totalAmount: number;
    localisation: Localisation;
    status: string;
}


export interface AddBookingInput {

    startedAt: string;
    finishedAt: string;

}

export interface EditBookingInput {

    startedAt: string;
    finishedAt: string;

}