// MODELO DE TODOS LOS ACTIVOS
export interface GetAssets {
    id_asset: number;
    fk_location: number;
    asset_dateRegister: Date;
    asset_mark: string;
    asset_model: string;
    asset_serial: string;
    asset_status: string;
    city: string;
    sede: string;
    store: string;
    typeAsset_name: string;
};

// MODELO PARA CREAR Y ACTUALIZAR ACTIVOS
export interface CreateAndPutAsset {
    typeAsset:number,
    location:number,
    serial:string,
    model:string,
    mark:string,
};

// MODELO PARA ERRORES DE VALIDACION DE ACTIVOS
export interface ValidateErrosAssets {
    typeAsset: string[];
    location: string[];
    serial: string[];
    model: string[];
    mark: string[];
};

// MODELO DE RESPUESTA AL CREAR O ACTULIZAR UN ACTIVO EXITOSO
export interface CreateAndUpdateAssetResp {
    message: string;
}