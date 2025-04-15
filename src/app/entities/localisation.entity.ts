export interface Localisation {
    id: number
    streetNumber: string;
    streetName: string;
    zipCode: string;
    city: string;
    latitude: string;
    longitude: string;

}


export interface AddLocalisationgInput {

    streetNumber: string;
    streetName: string;
    zipCode: string;
    city: string;
    latitude: string;
    longitude: string;

}


export interface EditLocalisationgInput {

    streetNumber: string;
    streetName: string;
    zipCode: string;
    city: string;
    latitude: string;
    longitude: string;

}