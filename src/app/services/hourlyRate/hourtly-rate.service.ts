import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { lastValueFrom, Observable } from 'rxjs';
import { AddHourlyRateInput, EditHourlyRateInput, HourlyRate } from '../../entities/hourlyRate.entity';

@Injectable({
  providedIn: 'root'
})
export class HourtlyRateService {
  private readonly http: HttpClient = inject(HttpClient)

  private readonly rootUrl: string = environment.API_URL
  private readonly resource: 'hourlyRate' = 'hourlyRate'


  async list(): Promise<HourlyRate[]> {
    const http$: Observable<HourlyRate[]> = this.http.get<HourlyRate[]>(`${this.rootUrl}/${this.resource}`)
    return lastValueFrom(http$)
    }


    async getById(id:number): Promise<HourlyRate> { 
      const http$: Observable<HourlyRate> = this.http.get<HourlyRate>(`${this.rootUrl}/${this.resource}/${id}`)
      return lastValueFrom(http$)
      } 
      
  
      async create(id: string, addHourlyRateInput: AddHourlyRateInput): Promise<HourlyRate> { 
        const http$: Observable<HourlyRate> = this.http.post<HourlyRate>(`${this.rootUrl}/${this.resource}/${id}`, addHourlyRateInput)
        return lastValueFrom(http$)
        }


      async edit(id:number, editHourlyRateInput: EditHourlyRateInput): Promise<void> {
          const http$= this.http.put<void>(`${this.rootUrl}/${this.resource}/${id}`, editHourlyRateInput)
          return lastValueFrom(http$)
          }


           async delete(id:number): Promise<void> {
            const http$= this.http.delete<void>(`${this.rootUrl}/${this.resource}/${id}`)
            return lastValueFrom(http$)
           }
  
}
