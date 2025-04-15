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


  async getById(id:string): Promise<Booking> { 
      const http$: Observable<Booking> = this.http.get<Booking>(`${this.rootUrl}/${this.resource}/${id}`)
      return lastValueFrom(http$)
      }


   async create(id: string, addBookingInput: AddBookingInput): Promise<Booking> { 
      const http$: Observable<Booking> = this.http.post<Booking>(`${this.rootUrl}/${this.resource}/${id}`, addBookingInput)
      return lastValueFrom(http$)
      }    



  async edit(id:string, editBookingInput:EditBookingInput): Promise<void> {
      const http$= this.http.put<void>(`${this.rootUrl}/${this.resource}/${id}`, editBookingInput)
      return lastValueFrom(http$)
      }


  async delete(id:string): Promise<void> {
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


// Troouver les booking par user


async findFutureBookings(): Promise<Booking[]> {
  const http$: Observable<Booking[]> = this.http.get<Booking[]>(`${this.rootUrl}/${this.resource}/future`);
  return lastValueFrom(http$);
}


async findAnteriorBookings(): Promise<Booking[]> {
  const http$: Observable<Booking[]> = this.http.get<Booking[]>(`${this.rootUrl}/${this.resource}/anterior`);
  return lastValueFrom(http$);
}
  

}
