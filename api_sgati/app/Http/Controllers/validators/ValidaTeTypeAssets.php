<?php

namespace App\Http\Controllers\validators;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ValidaTeTypeAssets
{
    // METODO PARA VALIDAR LOS CAMPOS DE CREACION Y EDICION DE TIPOS DE ACTIVOS
    public function ValidateCreateAndUpdateTypeAsset(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'typeAssetName' => 'required|string',
        ], [
            'typeAssetName.required' => 'El tipo de activo es obligatorio',
        ]);

        // ENVIAR ERRORES DE VALIDACION AL FRONENT
        if ($validator->fails()) {
            return response()->json($validator->errors(), 404);
        }
        
        return null;
    }
}
