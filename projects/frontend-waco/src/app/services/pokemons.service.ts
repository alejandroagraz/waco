import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import { Global } from './global';

const httpOptions = {
  headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization' : `Bearer ${window.localStorage.getItem('access_token')!}`
  })
};

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  public uri: string;

  constructor(private http: HttpClient) {
    this.uri = Global.url;
  }

  getPokemons(): Observable<any> {
    return this.http.get(
      `${this.uri}/pokemons?page=1&take=50&order=ASC`,
      httpOptions
    );
  };
}
