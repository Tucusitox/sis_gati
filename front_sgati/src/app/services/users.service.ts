import { inject, Injectable } from '@angular/core';
import { urlDesarrollo } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CreateUsers, GetUsers, PutUsers } from '../models/Users';
import { CreateAndUpdateAssetResp } from '../models/Assets';

@Injectable({
  providedIn: 'root' 
})
export class UsersService {
  private url: String = urlDesarrollo;
  private http = inject(HttpClient);

  getAllUsers():Observable<GetUsers[]>{
    return this.http.get<GetUsers[]>(`${ this.url }AllUsers`);
  };

  getAllRols():Observable<any[]>{
    return this.http.get<any[]>(`${ this.url }AllRols`);
  };

  createUsers(body:CreateUsers):Observable<CreateAndUpdateAssetResp>{
    return this.http.post<CreateAndUpdateAssetResp>(`${ this.url }CreateUser/`,body);
  };

  updateUser(body:PutUsers, idUser:number):Observable<CreateAndUpdateAssetResp>{
    return this.http.put<CreateAndUpdateAssetResp>(`${ this.url }UpdateUser/${idUser}`, body);
  };

  blockAndDesblockUser(typeAccion:string, idUser:number):Observable<CreateAndUpdateAssetResp>{
    return this.http.put<CreateAndUpdateAssetResp>(`${ this.url }BlockAndDesblockUser/${typeAccion}/${idUser}`, null);
  };
}
