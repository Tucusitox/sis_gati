<?php

namespace App\Http\Controllers\activos;

use App\Http\Controllers\validators\ValidateAssets;
use App\Models\Asset;
use Illuminate\Http\Request;

class CreateAssetController extends ValidateAssets
{
    // METODO PARA REGITRAR UN NUEVO ACTIVO
    public function createAsset(Request $request)
    {
        // VALIDAR LOS CAMPOS DE CREACION
        $validation = $this->ValidateCreateAndUpdateAsset($request,'create');
        if ($validation) {
            return $validation;
        }
        // REGITRAR EL NUEVO ACTIVO
        Asset::insert([
            'fk_typeAsset' => $request->post('typeAsset'),
            'fk_location' => $request->post('location'),
            'asset_serial' => $request->post('serial'),
            'asset_model' => $request->post('model'),
            'asset_mark' => $request->post('mark'),
            'asset_dateRegister' => now()->format('Y-m-d'),
            'asset_status' => 'disponible',
        ]);
        return response()->json(['message'=>'Activo registrado con exito'],200);
    }
}
