import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AssetsService } from '../../../services/assets.service';
import { HttpErrorResponse } from '@angular/common/http';
import { CreateAndUpdateAssetResp, ValidateErrosAssets } from '../../../models/Assets';
import { AlertMessageComponent } from '../../alert-message/alert-message.component';

@Component({
  selector: 'app-create-asset',
  imports: [CommonModule, FormsModule, AlertMessageComponent],
  templateUrl: './create-asset.component.html',
})

export class CreateAssetComponent implements OnInit{
  protected assetsService = inject(AssetsService);
  protected inputsValidate:boolean = false;
  protected isCargando:boolean = false;
  protected typeAssets:any[] = [];
  protected locationAsset:any[] = [];
  protected successRequest:boolean = false;
  protected successMessage:string = '';

  // VARIABLES PARA ERRORES DE VALIDACIONES
  protected typeAssetErrorsMessg:string[] = [];
  protected validateErros: ValidateErrosAssets[] = [];
  protected locationErrorsMessg:string[] = [];
  protected serialErrorsMessg:string[] = [];
  protected modelErrorsMessg:string[] = [];
  protected markErrorsMessg:string[] = [];

  // VARIABLES A EDITAR
  protected idTypeAsset:number = 0;
  protected idLocationAsset:number = 0;
  protected serialAsset:string = '';
  protected modelAsset:string = '';
  protected markAsset:string = '';

  ngOnInit(): void {
    this.getTypeAsset();
    this.getAsseLocation();
  }

  getTypeAsset(){
    this.assetsService.getAllTypeAssetsUpdate().subscribe({
      next: (resp:any[]) => {
        this.typeAssets = resp;
      },
      error: (err) => {
        if (err.status == 404 ) {
          console.log('Error Inesperado');
        }
      }
    });
  };

  getAsseLocation(){
    this.assetsService.getAllEditAssetsLocations().subscribe({
      next: (resp:any[]) => {
        this.locationAsset = resp;
      },
      error: (err) => {
        if (err.status == 404 ) {
          console.log('Error Inesperado');
        }
      }
    });
  };

  newAsset() {
    this.isCargando = true;

    let BodyRequest = {
      typeAsset: this.idTypeAsset,
      location: this.idLocationAsset,
      serial: this.serialAsset,
      model: this.modelAsset,
      mark: this.markAsset
    };

    this.assetsService.createAsset(BodyRequest).subscribe({
      next: (resp:CreateAndUpdateAssetResp) => {
        this.successMessage = resp.message;
        this.isCargando = false;
        this.successRequest = true
        this.cleanInputs();
      },
      error: (err: HttpErrorResponse) => { 
        if (err.status === 404) {
          this.validateErros = [err.error]; 
          this.typeAssetErrorsMessg = this.validateErros[0].typeAsset;
          this.locationErrorsMessg = this.validateErros[0].location;
          this.serialErrorsMessg = this.validateErros[0].serial;
          this.modelErrorsMessg = this.validateErros[0].model;
          this.markErrorsMessg = this.validateErros[0].mark;
          this.inputsValidate = true;
          this.isCargando = false;
        }
      }
    });
  };

  onAlertClosed() {
    this.successRequest = false;
  }

  cleanInputs(){
    this.idTypeAsset = 0;
    this.idLocationAsset = 0;
    this.serialAsset = '';
    this.modelAsset = '';
    this.markAsset = '';
  };
}
