import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { initFlowbite } from 'flowbite';
import { UsersService } from '../../../services/users.service';
import { FormsModule } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { CreateAndUpdateAssetResp } from '../../../models/Assets';
import { AlertMessageComponent } from '../../alert-message/alert-message.component';
import { ValidateErrosUsers } from '../../../models/Users';

@Component({
  selector: 'app-users-create',
  imports: [CommonModule, FormsModule, AlertMessageComponent],
  templateUrl: './users-create.component.html',
})

export class UsersCreateComponent implements OnInit {

  protected usersService = inject(UsersService); 
  protected allRols: any[] = [];
  protected inputsValidate:boolean = false;
  protected isCargando:boolean = false;
  protected successRequest:boolean = false;
  protected successMessage:string = '';
  @Output() refresComponent = new EventEmitter<void>();

  // VARIABLES PARA ERRORES DE VALIDACIONES
  protected validateErros: ValidateErrosUsers[] = [];
  protected userRolErrorsMessg:string[] = [];
  protected userNameErrorsMessg:string[] = [];
  protected userEmailErrorsMessg:string[] = [];

  // VARIABLES A UTILIZAR
  protected idRol: number = 0;
  protected userName: string = '';
  protected userEmail: string = '';

  ngOnInit(): void {
    initFlowbite();
    this.getRols();
  }

  getRols(){
    this.usersService.getAllRols().subscribe({
      next: (resp:any[]) => {
        this.allRols = resp;
      },
      error: (err) => {
        if (err.status == 404 ) {
          console.log('Error Inesperado');
        }
      }
    });
  };

  newUser() {
    this.isCargando = true;

    let BodyRequest = {
      userRol: this.idRol,
      userName: this.userName,
      userEmail: this.userEmail,
      userPassword: '12345678',
    };

    this.usersService.createUsers(BodyRequest).subscribe({
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
          this.userRolErrorsMessg = this.validateErros[0].userRol;
          this.userNameErrorsMessg = this.validateErros[0].userName;
          this.userEmailErrorsMessg = this.validateErros[0].userEmail;
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
    this.idRol = 0;
    this.userName = '';
    this.userEmail = '';
  };
}
