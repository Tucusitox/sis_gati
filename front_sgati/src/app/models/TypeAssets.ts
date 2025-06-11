// MODELO DE TODOS LOS TIPOS DE ACTIVOS
export interface GetTypeAssets {
    id_typeAsset: number,
    typeAsset_name: string,
};

// MODELO PARA CREAR Y ACTUALIZAR TIPOS DE ACTIVOS
export interface CreateAndPutTypeAsset {
    typeAssetName:string,
};

// MODELO PARA ERRORES DE VALIDACION DE LOCACIONES
export interface ValidateErrosTypeAsset {
    typeAssetName: string[];
};