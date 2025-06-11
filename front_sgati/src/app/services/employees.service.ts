import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { urlDesarrollo } from '../../environments/environment.development';
import { Observable } from 'rxjs';
import { CreateAndPutEmployee, GetEmployees } from '../models/Employees';
import { CreateAndUpdateAssetResp } from '../models/Assets';

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {

  private url: String = urlDesarrollo;
  private http = inject(HttpClient);

  getAllEmployees():Observable<GetEmployees[]>{
    return this.http.get<GetEmployees[]>(`${ this.url }AllEmployees`);
  };

  createEmployee(body:CreateAndPutEmployee):Observable<CreateAndUpdateAssetResp>{
    return this.http.post<CreateAndUpdateAssetResp>(`${ this.url }CreateEmployee/`,body);
  };

  updateEmployee(body:CreateAndPutEmployee, idEmployee:number):Observable<CreateAndUpdateAssetResp>{
    return this.http.put<CreateAndUpdateAssetResp>(`${ this.url }UpdateEmployee/${idEmployee}`, body);
  };
  
  getAllEditLocationsEmployee():Observable<any[]>{
    return this.http.get<any[]>(`${ this.url }UpdateLocationEmployee`);
  };

}
