import { Component, inject } from '@angular/core';
import { EmployeesService } from '../../../services/employees.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AlertMessageComponent } from '../../alert-message/alert-message.component';
import { HttpErrorResponse } from '@angular/common/http';
import { CreateAndUpdateAssetResp } from '../../../models/Assets';
import { ValidateErrosEmployees } from '../../../models/Employees';

@Component({
  selector: 'app-employees-create',
  imports: [CommonModule, FormsModule, AlertMessageComponent],
  templateUrl: './employees-create.component.html',
})

export class EmployeesCreateComponent {
  protected employeesService = inject(EmployeesService);
  protected inputsValidate:boolean = false;
  protected isCargando:boolean = false;
  protected locationsEmployee:any[] = [];
  protected successRequest:boolean = false;
  protected successMessage:string = '';

  // VARIABLES PARA ERRORES DE VALIDACIONES
  protected validateErros: ValidateErrosEmployees[] = [];
  protected locationErrorsMessg:string[] = [];
  protected userNameErrorsMessg:string[] = [];
  protected nameErrorsMessg:string[] = [];
  protected lastNameErrorsMessg:string[] = [];

  // VARIABLES A EDITAR
  protected idLocationEmployee:number = 0;
  protected employeeUserName:string = '';
  protected employeeName:string = '';
  protected employeeLastName:string = '';

  ngOnInit(): void {
    this.getLocationsEmployess();
  };

  getLocationsEmployess(){
    this.employeesService.getAllEditLocationsEmployee().subscribe({
      next: (resp:any[]) => {
        this.locationsEmployee = resp;
      },
      error: (err) => {
        if (err.status == 404 ) {
          console.log('Error Inesperado');
        }
      }
    });
  };

  newEmployee() {
    this.isCargando = true;

    let BodyRequest = {
      location: this.idLocationEmployee,
      userName: this.employeeUserName,
      name: this.employeeName,
      lastName: this.employeeLastName,
    };

    this.employeesService.createEmployee(BodyRequest).subscribe({
      next: (resp:CreateAndUpdateAssetResp) => {
        this.successMessage = resp.message;
        this.isCargando = false;
        this.successRequest = true
        this.cleanInputs();
      },
      error: (err: HttpErrorResponse) => { 
        if (err.status === 404) {
          this.validateErros = [err.error]; 
          this.locationErrorsMessg = this.validateErros[0].location;
          this.userNameErrorsMessg = this.validateErros[0].userName;
          this.nameErrorsMessg = this.validateErros[0].name;
          this.lastNameErrorsMessg = this.validateErros[0].lastName;
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
    this.idLocationEmployee = 0;
    this.employeeUserName = '';
    this.employeeName = '';
    this.employeeLastName = '';
  };
}
