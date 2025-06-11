<?php

namespace App\Http\Controllers\validators;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ValidateLocations
{
    // METODO PARA VALIDAR LOS CAMPOS DE CREACION Y EDICION DE LOCACIONES
    public function ValidateCreateAndUpdateLocation(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'locationCity' => 'required|string',
            'locationSede' => 'required|string',
            'locationStore' => 'required|string',
        ],[
            'locationCity.required' => 'La ciudad es obligatoria',
            'locationSede' => 'La sede es obligatoria',
            'locationStore' => 'El almacen es obligatorio',
        ]);

        // ENVIAR ERRORES DE VALIDACION AL FRONENT
        if ($validator->fails()) {
            return response()->json($validator->errors(), 404);
        }
        
        return null;
    }
}
