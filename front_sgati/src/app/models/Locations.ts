// MODELO DE TODOS LAS LOCACIONES
export interface GetLocations {
    id_location: number,
    city: string,
    sede: string,
    store: string,
};

// MODELO PARA CREAR Y ACTUALIZAR LOCACIONES
export interface CreateAndPutLocations {
    locationCity: string,
    locationSede: string,
    locationStore: string,
};

// MODELO PARA ERRORES DE VALIDACION DE LOCACIONES
export interface ValidateErrosLocations {
    locationCity: string[];
    locationSede: string[];
    locationStore: string[];
};