<?php

namespace App\Http\Controllers\activos;

use App\Http\Controllers\validators\ValidateAssets;
use App\Models\Asset;
use App\Models\Location;
use App\Models\TypeAsset;
use Illuminate\Http\Request;

class UpdateAssetController extends ValidateAssets
{
    // METODO PARA ACTUALIZAR UN ACTIVO
    public function updateAsset(Request $request, int $idActivo)
    {   
        // VALIDAR LOS CAMPOS DE CREACION
        $validation = $this->ValidateCreateAndUpdateAsset($request,'update');
        if ($validation) {
            return $validation;
        }
        // ACTUALIZAR EL ACTIVO  SELECCIONADO
        Asset::find($idActivo)->update([
            'fk_typeAsset' => $request->post('typeAsset'),
            'fk_location' => $request->post('location'),
            'asset_serial' => $request->post('serial'),
            'asset_model' => $request->post('model'),
            'asset_mark' => $request->post('mark'),
        ]);
        return response()->json(['message'=>'Activo actualizado con exito'],200);
    }

    // METODO PARA MOSTRAR LOCACIONES Y EDITARLAS
    public function updateAssetLocation()
    {
        $assetsUpdateLocations = Location::select('id_location')
        ->selectRaw("CONCAT(city,' ',sede,' ',store) AS AssetsLocations")
        ->get(); 

        return response()->json($assetsUpdateLocations, 200);
    }

    // METODO PARA MOSTRAR LOS TIPOS DE ACTIVOS Y EDITARLOS
    public function updateViewTypeAsset()
    {
        $viewTypeAsset = TypeAsset::all();
        return response()->json($viewTypeAsset, 200);
    }
}
