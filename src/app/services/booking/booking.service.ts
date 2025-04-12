import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { lastValueFrom, Observable } from 'rxjs';
import { AddBookingInput, Booking, EditBookingInput } from '../../entities/booking.entity';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  private readonly http: HttpClient = inject(HttpClient)

  private readonly rootUrl: string = environment.API_URL
  private readonly resource: 'booking' = 'booking'




  async list(): Promise<Booking[]> {
    const http$: Observable<Booking[]> = this.http.get<Booking[]>(`${this.rootUrl}/${this.resource}`)
    return lastValueFrom(http$)
  }


  async getById(id:number): Promise<Booking> { 
      const http$: Observable<Booking> = this.http.get<Booking>(`${this.rootUrl}/${this.resource}/${id}`)
      return lastValueFrom(http$)
      }


/*    async create(chargingStationId: string, addBookingInput: AddBookingInput): Promise<Booking> { 
      const http$: Observable<Booking> = this.http.post<Booking>(`${this.rootUrl}/${this.resource}/${chargingStationId}`, addBookingInput)
      return lastValueFrom(http$)
      }    */


      create(chargingStationId: string, bookingData: AddBookingInput): Observable<any> {
        const payload = {
            // Assurez-vous que vous remplissez le DTO correctement
            startedAt: bookingData.startedAt,
            finishedAt: bookingData.finishedAt,
            // Ajoutez d'autres champs si nécessaire
        };
        return this.http.post(`${this.rootUrl}/${this.resource}/${chargingStationId}`, payload);
    } 


  async edit(id:number, editBookingInput:EditBookingInput): Promise<void> {
      const http$= this.http.put<void>(`${this.rootUrl}/${this.resource}/${id}`, editBookingInput)
      return lastValueFrom(http$)
      }


  async delete(id:number): Promise<void> {
      const http$= this.http.delete<void>(`${this.rootUrl}/${this.resource}/${id}`)
      return lastValueFrom(http$)
      }   


      async findBookingsWithUserLocalisation(): Promise<Booking[]> {
        const http$: Observable<Booking[]> = this.http.get<Booking[]>(`${this.rootUrl}/${this.resource}/matching-localisation`);
        return lastValueFrom(http$);
    }



    async findFutureBookingsWithUserLocalisation(): Promise<Booking[]> {
      const http$: Observable<Booking[]> = this.http.get<Booking[]>(`${this.rootUrl}/${this.resource}/matching-future-localisation`);
      return lastValueFrom(http$);
  }


  async findAnteriorBookingsWithUserLocalisation(): Promise<Booking[]> {
    const http$: Observable<Booking[]> = this.http.get<Booking[]>(`${this.rootUrl}/${this.resource}/matching-anterior-localisation`);
    return lastValueFrom(http$);
}
  

}
