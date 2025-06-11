import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AlertMessageComponent } from '../../alert-message/alert-message.component';
import { TypeAssetService } from '../../../services/type-asset.service';
import { CreateAndUpdateAssetResp } from '../../../models/Assets';

@Component({
  selector: 'app-type-asset-edit',
  imports: [CommonModule, FormsModule, AlertMessageComponent],
  templateUrl: './type-asset-edit.component.html',
  styles: ``
})

export class TypeAssetEditComponent {
  protected typeAssetService = inject(TypeAssetService); 
  protected inputsValidate:boolean = false;
  protected isCargando:boolean = false;
  
  @Input() idModal: string = "";
  @Input() isOpen: boolean = false;
  @Input() tittleModal: string = '';
  @Output() modalClosed = new EventEmitter<void>();
  @Output() editMessageSuccess = new EventEmitter<string>();

  // VARIABLES A EDITAR
  @Input() idTypeAsset: number = 0;
  @Input() nameTypeAsset:string = '';

  typeAssetUpdate(){

    this.isCargando = true;

    let BodyRequest = {
      typeAssetName: this.nameTypeAsset,
    };

    this.typeAssetService.updateTypeAsset(BodyRequest, this.idTypeAsset).subscribe({
      next: (resp:CreateAndUpdateAssetResp) => {
        this.isCargando = false;
        this.inputsValidate = false;
        this.closeModal();
        this.editMessageSuccess.emit(resp.message);
      },
      error: (err) => {
        if (err.status == 404 ) {
          this.inputsValidate = true;
          this.isCargando = false;
        }
      }
    });
  };

  closeModal() {
    this.modalClosed.emit();
  }
}
