// MODELO DE TODOS LOS EMPLEADOS
export interface GetEmployees {
    id_employee: number,
    employee_userName: string,
    NombreApellido: string,
    UbicacionEmpleado: string
    ActivosAsignados: number,
};

// MODELO PARA CREAR Y ACTUALIZAR EMPLEADOS
export interface CreateAndPutEmployee {
    location:number,
    userName:string,
    name:string,
    lastName:string,
};

// MODELO PARA ERRORES DE VALIDACION DE ACTIVOS
export interface ValidateErrosEmployees {
    location: string[];
    userName: string[];
    name: string[];
    lastName: string[];
};