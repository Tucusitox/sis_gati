import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthResponse } from '../../models/AuthResponse';
import { AlertMessageComponent } from '../../components/alert-message/alert-message.component';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule, AlertMessageComponent],
  templateUrl: './login.component.html',
})

export class LoginComponent {
  private authService = inject(AuthenticationService)
  protected userName:string = "";
  protected userPassword:string = "";
  protected inputsValidate:boolean = false;
  protected showPassword:boolean = false;
  protected showAlertErros:boolean = false;
  protected isCargando:boolean = false;
  protected messageErros:string = '';
  protected messageInputErroName:string = '';
  protected messageInputErroPassword:string = '';

  // AUTENTICAMOS Y GUARDAMOS EL LOCALSTORAGE
  public autenticarUsuario(): void {
    
    // VALIDAR INPUTS DEL FORMULARIO
    if (!this.userName || !this.userPassword) {
      this.inputsValidate = true;
      this.messageInputErroName = 'El nombre es obligatorio';
      this.messageInputErroPassword = 'La contraseña es obligatoria';
      return
    }
    // VALIDAR NUMERO DE CARACTERES
    if (this.userName.length < 5 || this.userPassword.length < 8) {
      this.inputsValidate = true;
      this.messageInputErroName = 'El nombre debe tener min 5 carácteres';
      this.messageInputErroPassword = 'La contraseña debe tener min 8 carácteres';
      return
    }

    // GUARDAR NAME Y PASSWORD EN UN OBJETO
    let bodyRequest = {
      name: this.userName,
      password: this.userPassword,
    }

    this.isCargando = true; //--> ABRIR MENSAJE DE CARGA

    // REALIZAMOS LA PETICION PARA AAUTENTICAR
    this.authService.authenticacionUser(bodyRequest).subscribe({
      next: (resp:AuthResponse) => {
        this.saveLocalStorage(resp)

        // LIMPIAR CAMPOS 
        this.userName = '';
        this.userPassword = '';
      },
      error: (err) => {
        if (err.status == 404 ) {
          this.showAlertErros = true;
          this.isCargando = false; //--> CERRAR MENSAJE DE CARGA
          this.messageErros = err.error.message;
        }
      }
    });
  };

  // METODO PARA GUARDAR DATOS DEL USUARIO AUTENTICADO EN LOCALSTORAGE
  private saveLocalStorage(resp: AuthResponse): void {
    const userAuthData = {
      userRol: resp.userRol,
      userName: resp.userName,
      userEmail: resp.userEmail,
      userToken: resp.userToken,
      expiraToken: this.calcularExpToken(),
    };
    // GUARDAR EN LOCAL Y REDIRECCIONAR
    localStorage.setItem('userAuthData', JSON.stringify(userAuthData));
    localStorage.setItem('logeado', 'true');
    window.location.href = '/dashboard';
  }

  // METODO PARA CALCULAR Y VALIDAR EL TIMPO DE EXPIRACION DEL TOKEN
  private calcularExpToken(): string {
    let toDay = new Date();
    toDay.setTime(toDay.getTime() + (10 * 60 * 60 * 1000)); //--> 10 HORAS EN MILISENGUNDOS
    return toDay.getTime().toString();
  }

  // ALERTA DE CARGA PARA CERRAR ALERTA DE ERRORES
  onAlertClosed() {
    this.showAlertErros = false;
  }

  // PARA QUE EL USUARIO VEA SU CONTRASEÑA EN EL INPUT
  public passwordVisible(): void {
    this.showPassword = !this.showPassword;
  }
}
