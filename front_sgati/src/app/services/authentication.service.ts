import { inject, Injectable } from '@angular/core';
import { urlDesarrollo } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthResponse } from '../models/AuthResponse';

@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {

  private url: String = urlDesarrollo;
  private http = inject(HttpClient);

  authenticacionUser(body:any): Observable<AuthResponse> {
    return this.http.post<any>(`${ this.url }AuthUser`, body);
  }

  logoutUser():Observable<any>{
    return this.http.get<any>(`${ this.url }LogoutUser`, { observe: 'response' });
  }
}
