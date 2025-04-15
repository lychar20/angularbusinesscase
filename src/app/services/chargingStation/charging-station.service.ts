import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';
import { lastValueFrom, Observable } from 'rxjs';
import { AddChargingStationInput, ChargingStation, EditChargingStationInput } from '../../entities/charging.entity';

@Injectable({
  providedIn: 'root'
})
export class ChargingStationService {
  private readonly http: HttpClient = inject(HttpClient)

  private readonly rootUrl: string = environment.API_URL
  private readonly resource: 'chargingstation' = 'chargingstation'

  
  async list(): Promise<ChargingStation[]> {
    const http$: Observable<ChargingStation[]> = this.http.get<ChargingStation[]>(`${this.rootUrl}/${this.resource}`)
    return lastValueFrom(http$)
  }

  async findAllChargingStationsWithDetails(): Promise<ChargingStation[]> {
    const http$: Observable<ChargingStation[]> = this.http.get<ChargingStation[]>(`${this.rootUrl}/${this.resource}/with-details`);
    return lastValueFrom(http$);
}


   async getById(uuid:string): Promise<ChargingStation> { 
    const http$: Observable<ChargingStation> = this.http.get<ChargingStation>(`${this.rootUrl}/${this.resource}/${uuid}`)
    return lastValueFrom(http$)
    }


    async create(addChargingStationInput: AddChargingStationInput): Promise<ChargingStation> { 
      const http$: Observable<ChargingStation> = this.http.post<ChargingStation>(`${this.rootUrl}/${this.resource}`, addChargingStationInput)
      return lastValueFrom(http$)
      }


      async edit(uuid:string, editChargingStationInput:EditChargingStationInput): Promise<void> {
        const http$= this.http.put<void>(`${this.rootUrl}/${this.resource}/${uuid}`, editChargingStationInput)
        return lastValueFrom(http$)
        }


        async delete(uuid:string): Promise<void> {
          const http$= this.http.delete<void>(`${this.rootUrl}/${this.resource}/${uuid}`)
          return lastValueFrom(http$)
          }



      async findChargingStationWithHourlyRateNUll(): Promise<ChargingStation[]> {
        const http$: Observable<ChargingStation[]> = this.http.get<ChargingStation[]>(`${this.rootUrl}/${this.resource}/hourNull`);
        return lastValueFrom(http$);
        }    


}
