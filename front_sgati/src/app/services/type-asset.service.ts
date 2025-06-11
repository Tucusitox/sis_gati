import { inject, Injectable } from '@angular/core';
import { urlDesarrollo } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CreateAndPutTypeAsset, GetTypeAssets } from '../models/TypeAssets';
import { CreateAndUpdateAssetResp } from '../models/Assets';

@Injectable({
  providedIn: 'root'
})
export class TypeAssetService {
  private url: String = urlDesarrollo;
  private http = inject(HttpClient);

  getAllTypeAssets():Observable<GetTypeAssets[]>{
    return this.http.get<GetTypeAssets[]>(`${ this.url }AllTypeAssets`);
  };

  createTypeAsset(body:CreateAndPutTypeAsset):Observable<CreateAndUpdateAssetResp>{
    return this.http.post<CreateAndUpdateAssetResp>(`${ this.url }CreateTypeAsset/`,body);
  };

  updateTypeAsset(body:CreateAndPutTypeAsset,idTypeAsset:number):Observable<CreateAndUpdateAssetResp>{
    return this.http.put<CreateAndUpdateAssetResp>(`${ this.url }UpdateTypeAsset/${idTypeAsset}`, body);
  };
}
