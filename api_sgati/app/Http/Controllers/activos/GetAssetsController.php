<?php

namespace App\Http\Controllers\activos;

use App\Models\Asset;

class GetAssetsController
{
    // METODO PARA TRAER TODOS LOS ACTIVOS EXISTENTES
    public function getAllAssets()
    {
        $AllActivos = Asset::select('id_asset',
            'asset_serial','asset_model','asset_mark','asset_dateRegister','asset_status',
            'typeAsset_name','date_assignment','city','sede','store','employee_userName'
            )
        ->selectRaw("CONCAT(employee_name,' ',employee_lastName) AS UsuarioAsignado")
        ->leftjoin('type_assets','type_assets.id_typeAsset','=','assets.fk_typeAsset')
        ->leftjoin('employees_x_assets','employees_x_assets.fk_asset','=','assets.id_asset')
        ->leftjoin('employees','employees.id_employee','=','employees_x_assets.fk_employee')
        ->leftjoin('locations','locations.id_location','=','assets.fk_location')
        ->orderBy('assets.asset_dateRegister', 'desc')
        ->get();

        return response()->json($AllActivos, 200);
    } 

    // METODO PARA OBTENER LOS DETALLES DE UN ACTIVO POR EL ID
    public function findAsset(int $idActivo)
    {
        $FindActivo = Asset::select('id_asset',
            'asset_serial','asset_model','asset_mark','asset_dateRegister','asset_status',
            'typeAsset_name','date_assignment','city','sede','store','employee_userName'
            )
        ->selectRaw("CONCAT(employee_name,' ',employee_lastName) AS UsuarioAsignado")
        ->leftjoin('type_assets','type_assets.id_typeAsset','=','assets.fk_typeAsset')
        ->leftjoin('employees_x_assets','employees_x_assets.fk_asset','=','assets.id_asset')
        ->leftjoin('employees','employees.id_employee','=','employees_x_assets.fk_employee')
        ->leftjoin('locations','locations.id_location','=','assets.fk_location')
        ->where('id_asset',$idActivo)
        ->first();

        return response()->json([$FindActivo], 200);
    }
}
