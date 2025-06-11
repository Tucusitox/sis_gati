// INTERFAZ DE LA RESPUESTA AL MOMENTO DE AUTENTICAR 
// SIRVE DE ESQUEMA PARA GUARDAR EN LOCALSTORAGE
export interface AuthResponse {
  userRol: string;
  userName: string;
  userEmail: string;
  userToken:String;
}
