import { HttpInterceptorFn } from '@angular/common/http';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {

  // EXCLUIR RUTA DE AUTENTICACION
  if (req.url.includes('AuthUser')) {
    return next(req);
  }

  const userData = localStorage.getItem('userAuthData');
  
  // SEGUIR CON LA PETICION SI NO HAY USUARIO LOGEADO
  if (!userData) {
    return next(req);
  }

  const userAuthData = JSON.parse(userData);
  const token = userAuthData.userToken;

  const newReq = req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`
    }
  });

  return next(newReq);
};
