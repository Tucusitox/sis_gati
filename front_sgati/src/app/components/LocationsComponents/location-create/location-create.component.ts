import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { initFlowbite } from 'flowbite';
import { AlertMessageComponent } from '../../alert-message/alert-message.component';
import { ValidateErrosLocations } from '../../../models/Locations';
import { LocationsService } from '../../../services/locations.service';
import { CreateAndUpdateAssetResp } from '../../../models/Assets';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-location-create',
  imports: [CommonModule, FormsModule, AlertMessageComponent],
  templateUrl: './location-create.component.html',
  styles: ``
})

export class LocationCreateComponent {
  protected locationService = inject(LocationsService); 
  protected inputsValidate:boolean = false;
  protected isCargando:boolean = false;
  protected successRequest:boolean = false;
  protected successMessage:string = '';
  @Output() refresComponent = new EventEmitter<void>();

  // VARIABLES PARA ERRORES DE VALIDACIONES
  protected validateErros: ValidateErrosLocations[] = [];
  protected cityErrorsMessg:string[] = [];
  protected sedeErrorsMessg:string[] = [];
  protected storeErrorsMessg:string[] = [];

  // VARIABLES A UTILIZAR
  protected ciudad: string = '';
  protected sede: string = '';
  protected almacen: string = '';

  ngOnInit(): void {
    initFlowbite();
  }

  newLocation() {
    this.isCargando = true;

    let BodyRequest = {
      locationCity: this.ciudad,
      locationSede: this.sede,
      locationStore: this.almacen,
    };

    this.locationService.createLocation(BodyRequest).subscribe({
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
          this.cityErrorsMessg = this.validateErros[0].locationCity;
          this.sedeErrorsMessg = this.validateErros[0].locationSede;
          this.storeErrorsMessg = this.validateErros[0].locationStore;
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
    this.ciudad = '';
    this.sede = '';
    this.almacen = '';
  };
}
