import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { lastValueFrom, Observable } from 'rxjs';
import { AddLocalisationgInput, EditLocalisationgInput, Localisation } from '../../entities/localisation.entity';

@Injectable({
  providedIn: 'root'
})
export class LocalisationService {
  private readonly http: HttpClient = inject(HttpClient)
  private readonly rootUrl: string = environment.API_URL
  private readonly resource: 'localisation' = 'localisation'



  async list(): Promise<Localisation[]> {
    const http$: Observable<Localisation[]> = this.http.get<Localisation[]>(`${this.rootUrl}/${this.resource}`)
    return lastValueFrom(http$)
    }


    async getById(id:number): Promise<Localisation> { 
      const http$: Observable<Localisation> = this.http.get<Localisation>(`${this.rootUrl}/${this.resource}/${id}`)
      return lastValueFrom(http$)
      }


      async create(addLocalisationgInput: AddLocalisationgInput): Promise<Localisation> { 
        const http$: Observable<Localisation> = this.http.post<Localisation>(`${this.rootUrl}/${this.resource}`, addLocalisationgInput)
        return lastValueFrom(http$)
        }


        async edit(id:number, editLocalisationgInput: EditLocalisationgInput): Promise<void> {
          const http$= this.http.put<void>(`${this.rootUrl}/${this.resource}/${id}`, editLocalisationgInput)
          return lastValueFrom(http$)
          } 


      async delete(id:number): Promise<void> {
        const http$= this.http.delete<void>(`${this.rootUrl}/${this.resource}/${id}`)
        return lastValueFrom(http$)
        }  

  
}
