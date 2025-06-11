<?php

namespace App\Http\Controllers\validators;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ValidateAssets
{
    // METODO PARA VALIDAR LOS CAMPOS DE CREACION Y EDICION DE ACTIVOS
    public function ValidateCreateAndUpdateAsset(Request $request, string $typeAccion)
    {
        $ValidateType = $typeAccion === 'create' 
        ? 'required|string|min:10|unique:assets,asset_serial' 
        : 'required|string|min:10';

        $validator = Validator::make($request->all(), [
            'serial' => $ValidateType,
            'model' => 'required|string|min:4',
            'mark' => 'required|string|min:2',
            'typeAsset' => 'required|numeric|min:1',
            'location' => 'required|numeric|min:1',
        ], [
            'serial.required' => 'El número de serie es obligatorio',
            'serial.min' => 'El número de serie debe tener al menos :min caracteres',
            
            'model.required' => 'El modelo es obligatorio',
            'model.min' => 'El modelo debe tener al menos 4 caracteres',
            
            'mark.required' => 'La marca es obligatoria',
            'mark.min' => 'La marca debe tener al menos 2 caracteres',
            
            'typeAsset.required' => 'El tipo de activo es obligatorio',
            'typeAsset.min' => 'El tipo de activo debe ser al menos 1',
            
            'location.required' => 'La ubicación es obligatoria',
            'location.min' => 'La ubicación es obligaria',
        ]);

        // ENVIAR ERRORES DE VALIDACION AL FRONENT
        if ($validator->fails()) {
            return response()->json($validator->errors(), 404);
        }
        
        return null;
    }
}
