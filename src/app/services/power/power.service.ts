import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { lastValueFrom, Observable } from 'rxjs';
import { AddPowerInput, EditPowerInput, Power } from '../../entities/power.entity';

@Injectable({
  providedIn: 'root'
})
export class PowerService {
  private readonly http: HttpClient = inject(HttpClient)

  private readonly rootUrl: string = environment.API_URL
  private readonly resource: 'power' = 'power'

  async list(): Promise<Power[]> { 
    const http$: Observable<Power[]> = this.http.get<Power[]>(`${this.rootUrl}/${this.resource}`)
    return lastValueFrom(http$)
  }

  async getById(id:number): Promise<Power> { 
    const http$: Observable<Power> = this.http.get<Power>(`${this.rootUrl}/${this.resource}/${id}`)
    return lastValueFrom(http$)
  }

  async create(addPowerInput: AddPowerInput): Promise<Power> { 
    const http$: Observable<Power> = this.http.post<Power>(`${this.rootUrl}/${this.resource}`, addPowerInput)
    return lastValueFrom(http$)
  }

  async edit(id:number, editPowerInput:EditPowerInput): Promise<void> {
    const http$= this.http.put<void>(`${this.rootUrl}/${this.resource}/${id}`, editPowerInput)
    return lastValueFrom(http$)
  }

  async delete(id:number): Promise<void> {
    const http$= this.http.delete<void>(`${this.rootUrl}/${this.resource}/${id}`)
    return lastValueFrom(http$)
  }

}
