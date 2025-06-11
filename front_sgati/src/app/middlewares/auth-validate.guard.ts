import { CanActivateFn, Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { inject } from '@angular/core';

// VALIDAR SI EXISTE UN USUARIO AUTENTICADO
export const AuthValidateUser: CanActivateFn = (route, state) => {
  const router = inject(Router);
  if (localStorage.getItem('logeado') === 'true') {
    router.navigate(['/dashboard']);
    return false;
  }
  return true;
};

// VALIDAR SI NO EXISTE UN USUARIO AUTENTICADO
export const NoAuthValidateUser: CanActivateFn = (route, state) => {
  const router = inject(Router);
  if (!localStorage.getItem('userAuthData')) {
    localStorage.removeItem('logeado');
    router.navigate(['/']);
    return false;
  }
  return true;
};

// VALIDAR EL TIEMPO DE EXPIRACION DEL TOKEN
export const ValidateTimeExpiresToken: CanActivateFn = (route, state) => {
  const regexSanctum = /^\d+\|[A-Za-z0-9]{40}$/;
  const userAuthData = JSON.parse(localStorage.getItem('userAuthData') || 'null');
  const tokenExpira = new Date(parseInt(userAuthData.expiraToken));
  const authService = inject(AuthenticationService);

  if (regexSanctum.test(userAuthData.expiraToken) || new Date() > tokenExpira) {
    authService.logoutUser().subscribe({
      next: (resp) => {
        if (resp.status == 200) {
          localStorage.removeItem('userAuthData');
          localStorage.removeItem('logeado');
          window.location.reload();
        } 
      },
      error: (err) => { console.log(err) }
    });
    return false;
  }
  return true;
};

// VALIDAR EL ROL DEL USUARIO
export const RolValidateUser: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const userData = JSON.parse(localStorage.getItem('userAuthData') || 'null');

  if (userData.userRol === 'Administrador') {
    return true;
  }
  
  router.navigate(['/dashboard']);
  return false;
};