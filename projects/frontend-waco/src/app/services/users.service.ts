import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import { Global } from './global';
import {Pokemon} from "../models/pokemons";
import {UserNew} from "../models/user-new";

const httpOptions = {
  headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization' : `Bearer ${window.localStorage.getItem('access_token')!}`
  })
};

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  public uri: string;

  constructor(private http: HttpClient) {
    this.uri = Global.url;
  }

  getUsers(): Observable<any> {
    return this.http.get(
      `${this.uri}/users?page=1&take=10&order=ASC`,
      httpOptions
    );
  };

  getUser(userId: string):Observable<any>{
    return this.http.get(
      `${this.uri}/users/${userId}`,
      httpOptions
    );
  }

  getUserFavorites(userId: string):Observable<any>{
    return this.http.get(
      `${this.uri}/users/favorites/${userId}?page=1&take=20&order=ASC`,
      httpOptions
    );
  }

  removeUser(userId: string): Observable<any> {
    return this.http.delete(
      `${this.uri}/users/${userId}` ,
      httpOptions
    );
  };

  addFavoriteUser(pokemon: Pokemon): Observable<any> {
    return this.http.post(
      `${this.uri}/users/favorites` ,
      pokemon,
      httpOptions
    );
  };

  userCreate(user: UserNew): Observable<any> {
    return this.http.post(
      `${this.uri}/users` ,
      user,
      httpOptions
    );
  };

  removeFavoriteUser(id: string): Observable<any> {
    return this.http.delete(
      `${this.uri}/users/favorite/pokemon/${id}` ,
      httpOptions
    );
  };
}
