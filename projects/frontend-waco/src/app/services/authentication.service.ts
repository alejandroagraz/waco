import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import { Global } from './global';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  public uri: string;

  constructor(private  http: HttpClient) {
    this.uri = Global.url;
  }

  login(username:string,password:string): Observable<any> {
    return this.http.post(
      `${this.uri}/auths/login` ,
      {
        username: username,
        password: password,
      },
      httpOptions
    );
  }
}
