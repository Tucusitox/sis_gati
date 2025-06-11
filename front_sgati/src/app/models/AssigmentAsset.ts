// MODELO PARA ASIGNAR UN ACTIVO A UN EMPELADO
export interface AssetAssigment {
    assetSerial:string,    
    employeeUserName:string,    
};

// MODELO PARA ERRORES DE VALIDACION DE LAS ASIGANCIONES
export interface ValidateErrosAssigmentAsset {
    assetSerial:string[],    
    employeeUserName:string[],
    assetSerialDelete:string[],
};

// MODELO PARA LIBERAR UN ACTIVO ASIGNADO
export interface DeleteAssetAssigment {
    assetSerialDelete:string,    
};

