import { CommonModule } from '@angular/common';
import {Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AlertMessageComponent } from '../../alert-message/alert-message.component';
import { AssetsService } from '../../../services/assets.service';
import { CreateAndUpdateAssetResp } from '../../../models/Assets';


@Component({
  selector: 'app-edit-assets',
  imports: [CommonModule, FormsModule, AlertMessageComponent],
  templateUrl: './edit-assets.component.html',
  styles: ``
})

export class EditAssetsComponent {
  protected assetsService = inject(AssetsService);
  @Input() idModal: string = "";
  @Input() isOpen: boolean = false;
  @Input() tittleModal: string = '';
  @Input() typeAssetUpdateModal: any[] = [];
  @Input() locationAsset:any[] = [];
  @Output() modalClosed = new EventEmitter<void>();
  @Output() editMessageSuccess = new EventEmitter<string>();
  protected inputsValidate:boolean = false;
  protected isCargando:boolean = false;

  // VARIABLES A EDITAR
  @Input() idAsset: number = 0;
  @Input() idTypeAsset: number = 0;
  @Input() idLocationAsset: number = 0;
  @Input() serialAsset:string = '';
  @Input() modelAsset:string = '';
  @Input() markAsset:string = '';

  assetUpdate(){

    this.isCargando = true;

    let BodyRequest = {
      typeAsset: this.idTypeAsset,
      location: this.idLocationAsset,
      serial: this.serialAsset,
      model: this.modelAsset,
      mark: this.markAsset
    };

    this.assetsService.updateAsset(BodyRequest, this.idAsset).subscribe({
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
