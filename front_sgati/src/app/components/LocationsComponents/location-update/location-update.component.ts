import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { LocationsService } from '../../../services/locations.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AlertMessageComponent } from '../../alert-message/alert-message.component';
import { CreateAndUpdateAssetResp } from '../../../models/Assets';

@Component({
  selector: 'app-location-update',
  imports: [CommonModule, FormsModule, AlertMessageComponent],
  templateUrl: './location-update.component.html',
  styles: ``
})

export class LocationUpdateComponent {
  protected locationService = inject(LocationsService);
  protected inputsValidate:boolean = false;
  protected isCargando:boolean = false;
  
  @Input() idModal: string = "";
  @Input() isOpen: boolean = false;
  @Input() tittleModal: string = '';
  @Output() modalClosed = new EventEmitter<void>();
  @Output() editMessageSuccess = new EventEmitter<string>();

  // VARIABLES A EDITAR
  @Input() idLocation: number = 0;
  @Input() ciudad:string = '';
  @Input() sede:string = '';
  @Input() almacen:string = '';

  locationUpdate(){

    this.isCargando = true;

    let BodyRequest = {
      locationCity: this.ciudad,
      locationSede: this.sede,
      locationStore: this.almacen,
    };

    this.locationService.updateLocation(BodyRequest, this.idLocation).subscribe({
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
