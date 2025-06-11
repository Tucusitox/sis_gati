import { AlertMessageComponent } from '../../alert-message/alert-message.component';
import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { initFlowbite } from 'flowbite';
import { AssigmentService } from '../../../services/assigment.service';
import { CreateAndUpdateAssetResp } from '../../../models/Assets';
import { HttpErrorResponse } from '@angular/common/http';
import { ValidateErrosAssigmentAsset } from '../../../models/AssigmentAsset';

@Component({
  selector: 'app-assigment',
  imports: [CommonModule, FormsModule, AlertMessageComponent],
  templateUrl: './assigment.component.html',
  styles: ``
})

export class AssigmentComponent implements OnInit {

  protected assigmentService = inject(AssigmentService);
  protected inputsValidate:boolean = false;
  protected isCargando:boolean = false;
  protected successRequest:boolean = false;
  protected successMessage:string = '';

  // VARIABLES A USAR
  protected assetSerial:string = '';
  protected deleteAssetSerial:string = '';
  protected employeeUser:string = '';

  // VARIABLES PARA ERRORES DE VALIDACIONES
  protected assigmentFallido:string = '';
  protected errorRequest:boolean = false;
  protected validateErros: ValidateErrosAssigmentAsset[] = [];
  protected serialErrorsMessg:string[] = [];
  protected serialDeleteAssigErrorsMessg:string[] = [];
  protected employeeErrorsMessg:string[] = [];

  ngOnInit(): void {
    initFlowbite();
  };

  // ASIGNAR UN EQUIPO
  assigmentAsset(){
    this.isCargando = true;

    let BodyRequest = {
      assetSerial:this.assetSerial,    
      employeeUserName:this.employeeUser,    
    };

    this.assigmentService.assigmentAsset(BodyRequest).subscribe({
      next: (resp:CreateAndUpdateAssetResp) => {
        this.successMessage = resp.message;
        this.isCargando = false;
        this.successRequest = true
        this.cleanInputs();
      },
      error: (err: HttpErrorResponse) => { 
        if (err.status === 404) {
          this.validateErros = [err.error]; 
          this.serialErrorsMessg = this.validateErros[0].assetSerial;
          this.employeeErrorsMessg = this.validateErros[0].employeeUserName;
          this.inputsValidate = true;
          this.isCargando = false;
        }

        if (err.status === 400) {
          this.isCargando = false;
          this.errorRequest = true
          this.assigmentFallido = err.error.message;
        }
      }
    });
  };

  // LIBERAR EQUIPO
  deleteAssigmentAsset(){
    this.isCargando = true;

    let BodyRequest = {
      assetSerialDelete:this.deleteAssetSerial,    
    };

    this.assigmentService.deleteAssignment(BodyRequest).subscribe({
      next: (resp:CreateAndUpdateAssetResp) => {
        this.successMessage = resp.message;
        this.isCargando = false;
        this.successRequest = true
        this.cleanInputs();
      },
      error: (err: HttpErrorResponse) => { 
        if (err.status === 404) {
          this.validateErros = [err.error]; 
          this.serialDeleteAssigErrorsMessg = this.validateErros[0].assetSerialDelete;
          this.inputsValidate = true;
          this.isCargando = false;
        }

        if (err.status === 400) {
          this.isCargando = false;
          this.errorRequest = true
          this.assigmentFallido = err.error.message;
        }
      }
    });
  };

  onAlertClosed() {
    this.successRequest = false;
    this.errorRequest = false;
  }

  cleanInputs(){
    this.assetSerial = '';
    this.employeeUser = '';
    this.deleteAssetSerial = '';
  };
}
