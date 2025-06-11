// MODELO DE TODOS LOS USUARIOS
export interface GetUsers {
    user_id: number,
    fk_rol: number,
    rol_name: string,
    name: string,
    email: string,
    status: string,
};

// MODELO PARA CREAR USUARIOS
export interface CreateUsers {
    userRol:number,
    userName:string,
    userEmail:string,
    userPassword:string,
};

// MODELO PARA ACTUALIZAR USUARIOS
export interface PutUsers {
    userRol:number,
    userName:string,
    userEmail:string,
};

// MODELO PARA ERRORES DE VALIDACION DE USUARIOS
export interface ValidateErrosUsers {
    userRol: string[];
    userName: string[];
    userEmail: string[];
};