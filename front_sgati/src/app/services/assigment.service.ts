import { inject, Injectable } from '@angular/core';
import { urlDesarrollo } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { AssetAssigment, DeleteAssetAssigment } from '../models/AssigmentAsset';
import { Observable } from 'rxjs';
import { CreateAndUpdateAssetResp } from '../models/Assets';

@Injectable({
  providedIn: 'root'
})
export class AssigmentService {

  private url: String = urlDesarrollo;
  private http = inject(HttpClient);

  assigmentAsset(body:AssetAssigment):Observable<CreateAndUpdateAssetResp>{
    return this.http.post<CreateAndUpdateAssetResp>(`${ this.url }AssigmentAsset/`,body);
  };

  deleteAssignment(body:DeleteAssetAssigment):Observable<CreateAndUpdateAssetResp>{
    return this.http.post<CreateAndUpdateAssetResp>(`${ this.url }DeleteAssigment/`, body);
  };
}
