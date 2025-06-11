import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AlertMessageComponent } from '../../alert-message/alert-message.component';
import { TypeAssetService } from '../../../services/type-asset.service';
import { initFlowbite } from 'flowbite';
import { CreateAndUpdateAssetResp } from '../../../models/Assets';
import { HttpErrorResponse } from '@angular/common/http';
import { ValidateErrosTypeAsset } from '../../../models/TypeAssets';

@Component({
  selector: 'app-type-asset-create',
  imports: [CommonModule, FormsModule, AlertMessageComponent],
  templateUrl: './type-asset-create.component.html',
  styles: ``
})

export class TypeAssetCreateComponent {
  protected typeAssetService = inject(TypeAssetService); 
  protected inputsValidate:boolean = false;
  protected isCargando:boolean = false;
  protected successRequest:boolean = false;
  protected successMessage:string = '';
  @Output() refresComponent = new EventEmitter<void>();

  // VARIABLES PARA ERRORES DE VALIDACIONES
  protected validateErros: ValidateErrosTypeAsset[] = [];
  protected typeAssetErrorsMessg:string[] = [];

  // VARIABLES A UTILIZAR
  protected nameTypeAsset: string = '';

  ngOnInit(): void {
    initFlowbite();
  }

  newTypeAsset() {
    this.isCargando = true;

    let BodyRequest = {
      typeAssetName: this.nameTypeAsset,
    };

    this.typeAssetService.createTypeAsset(BodyRequest).subscribe({
      next: (resp:CreateAndUpdateAssetResp) => {
        this.successMessage = resp.message;
        this.isCargando = false;
        this.successRequest = true
        this.cleanInputs();
        this.refresComponent.emit();
      },
      error: (err: HttpErrorResponse) => { 
        if (err.status === 404) {
          this.validateErros = [err.error]; 
          this.typeAssetErrorsMessg = this.validateErros[0].typeAssetName;
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
    this.nameTypeAsset = '';
  };
}
