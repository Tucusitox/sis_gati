import { inject, Injectable } from '@angular/core';
import { urlDesarrollo } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CreateAndPutAsset, CreateAndUpdateAssetResp, GetAssets, } from '../models/Assets';

@Injectable({
  providedIn: 'root'
})

export class AssetsService {
  
  private url: String = urlDesarrollo;
  private http = inject(HttpClient);

  getAllAssets():Observable<GetAssets[]>{
    return this.http.get<GetAssets[]>(`${ this.url }AllAssets`);
  };

  getAllEditAssetsLocations():Observable<any[]>{
    return this.http.get<any[]>(`${ this.url }UpdateAssetLocation`);
  };

  getAllTypeAssetsUpdate():Observable<any[]>{
    return this.http.get<any[]>(`${ this.url }UpdateViewTypeAsset`);
  };

  createAsset(body:CreateAndPutAsset):Observable<CreateAndUpdateAssetResp>{
    return this.http.post<CreateAndUpdateAssetResp>(`${ this.url }CreateAsset/`, body);
  };

  updateAsset(body:CreateAndPutAsset,idActivo:number):Observable<CreateAndUpdateAssetResp>{
    return this.http.put<CreateAndUpdateAssetResp>(`${ this.url }UpdateAsset/${idActivo}`, body);
  };
}
