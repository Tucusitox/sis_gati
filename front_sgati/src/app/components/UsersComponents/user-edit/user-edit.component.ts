import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { UsersService } from '../../../services/users.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AlertMessageComponent } from '../../alert-message/alert-message.component';
import { CreateAndUpdateAssetResp } from '../../../models/Assets';
import { ValidateErrosUsers } from '../../../models/Users';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-user-edit',
  imports: [CommonModule, FormsModule, AlertMessageComponent],
  templateUrl: './user-edit.component.html',
  styles: ``
})

export class UserEditComponent {
  protected usersService = inject(UsersService);
  protected inputsValidate:boolean = false;
  protected isCargando:boolean = false;
  
  @Input() idModal: string = "";
  @Input() isOpen: boolean = false;
  @Input() tittleModal: string = '';
  @Input() rolsAll: any[] = [];
  @Output() modalClosed = new EventEmitter<void>();
  @Output() editMessageSuccess = new EventEmitter<string>();

  // VARIABLES PARA ERRORES DE VALIDACIONES
  protected validateErros: ValidateErrosUsers[] = [];
  protected userRolErrorsMessg:string[] = [];
  protected userNameErrorsMessg:string[] = [];
  protected userEmailErrorsMessg:string[] = [];
  
  // VARIABLES A UTILIZAR
  @Input() idUser: number = 0;
  @Input() idRol: number = 0;
  @Input() userName: string = '';
  @Input() userEmail: string = '';

  employeeUpdate(){

    this.isCargando = true;

    let BodyRequest = {
      userRol: this.idRol,
      userName: this.userName,
      userEmail: this.userEmail,
    };

    this.usersService.updateUser(BodyRequest, this.idUser).subscribe({
      next: (resp:CreateAndUpdateAssetResp) => {
        this.isCargando = false;
        this.inputsValidate = false;
        this.closeModal();
        this.editMessageSuccess.emit(resp.message);
      },
      error: (err: HttpErrorResponse) => { 
        if (err.status === 404) {
          this.validateErros = [err.error]; 
          this.userRolErrorsMessg = this.validateErros[0].userRol;
          this.userNameErrorsMessg = this.validateErros[0].userName;
          this.userEmailErrorsMessg = this.validateErros[0].userEmail;
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
