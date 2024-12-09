import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, lastValueFrom, Observable } from 'rxjs';
import { RegisterInput } from '../../entities/register.entity';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly http = inject(HttpClient)
//3 types de subject: subject, behavior, replay. 

//Subject: un tuyau dans lequel on fait transiter la donnée
//Behavior: un subject et en plus on conserve la dernière valeur qui a transité: (Lecture/Ecriture)
//Replay: c'est un behavior subject et on peut conserver les X dernères valeures
  private _token$: BehaviorSubject< string | undefined> = new BehaviorSubject< string | undefined>(undefined)

  private readonly rootUrl = environment.API_URL
  private readonly ressource = 'auth'


  constructor() {
    const token = localStorage.getItem(environment.LOCALSTORAGE_KEYS.TOKEN)
    if (token) {
      this._token$.next(token)
    }
  }

  get token(): string | undefined {
    return this._token$.value
  }

  get token$(): Observable<string | undefined> {
    return this._token$.asObservable() //read only
  }

  async login (email: string, password: string, keepConnected: boolean) : Promise<void> { 
    const obs$ = this.http
    .post<{token: string}> (
      `${this.rootUrl}/${this.ressource}/login`,
      {email, password}
    )

    return lastValueFrom(obs$)
    .then(res => {
      this._token$.next(res.token)
      console.log(keepConnected)
      if (keepConnected) {
        localStorage.setItem(environment.LOCALSTORAGE_KEYS.TOKEN, res.token)
      }
    })

  }

  async register(registerInput: RegisterInput) : Promise<void> {
    const obs$: Observable<void> =  this.http
    .post<void>(
      `${this.rootUrl}/${this.ressource}/register`,
      registerInput
    )
    return lastValueFrom(obs$)
  }

  logout():void {
    localStorage.removeItem(environment.LOCALSTORAGE_KEYS.TOKEN)
    this._token$.next(undefined);
  }

}
