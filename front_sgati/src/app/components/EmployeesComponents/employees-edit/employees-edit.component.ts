import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { EmployeesService } from '../../../services/employees.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AlertMessageComponent } from '../../alert-message/alert-message.component';
import { CreateAndUpdateAssetResp } from '../../../models/Assets';

@Component({
  selector: 'app-employees-edit',
  imports: [CommonModule, FormsModule, AlertMessageComponent],
  templateUrl: './employees-edit.component.html',
})

export class EmployeesEditComponent {
  protected employeeService = inject(EmployeesService);
  protected inputsValidate:boolean = false;
  protected isCargando:boolean = false;
  
  @Input() idModal: string = "";
  @Input() isOpen: boolean = false;
  @Input() tittleModal: string = '';
  @Input() locationUpdateEmployee:any[] = [];
  @Output() modalClosed = new EventEmitter<void>();
  @Output() editMessageSuccess = new EventEmitter<string>();

  // VARIABLES A EDITAR
  @Input() idEmployee: number = 0;
  @Input() idLocationEmployee: number = 0;
  @Input() employeeUserNamme:string = '';
  @Input() employeeName:string = '';
  @Input() employeeLastName:string = '';

  employeeUpdate(){

    this.isCargando = true;

    let BodyRequest = {
      location: this.idLocationEmployee,
      userName: this.employeeUserNamme,
      name: this.employeeName,
      lastName: this.employeeLastName,
    };

    this.employeeService.updateEmployee(BodyRequest, this.idEmployee).subscribe({
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
