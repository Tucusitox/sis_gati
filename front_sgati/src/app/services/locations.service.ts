import { inject, Injectable } from '@angular/core';
import { urlDesarrollo } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { CreateAndPutLocations, GetLocations } from '../models/Locations';
import { Observable } from 'rxjs';
import { CreateAndUpdateAssetResp } from '../models/Assets';

@Injectable({
  providedIn: 'root'
})

export class LocationsService {
  private url: String = urlDesarrollo;
  private http = inject(HttpClient);

  getAllLocations():Observable<GetLocations[]>{
    return this.http.get<GetLocations[]>(`${ this.url }AllLocations`);
  };

  createLocation(body:CreateAndPutLocations):Observable<CreateAndUpdateAssetResp>{
    return this.http.post<CreateAndUpdateAssetResp>(`${ this.url }CreateLocation/`,body);
  };

  updateLocation(body:CreateAndPutLocations,idLocation:number):Observable<CreateAndUpdateAssetResp>{
    return this.http.put<CreateAndUpdateAssetResp>(`${ this.url }UpdateLocation/${idLocation}`, body);
  };
}
