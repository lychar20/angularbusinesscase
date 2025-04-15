export interface HourlyRate {
    id: number;
    value: number;           
    minimumDuration: number; 
}



export interface AddHourlyRateInput {

    value: number;           
    minimumDuration: number;

}

export interface EditHourlyRateInput {

    value: number;           
    minimumDuration: number;

}