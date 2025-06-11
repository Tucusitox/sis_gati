<?php

namespace App\Http\Controllers\validators;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ValidateEmployees
{
    // METODO PARA VALIDAR LOS CAMPOS DE CREACION Y EDICION DE ACTIVOS
    public function ValidateCreateAndUpdateEmployee(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'userName' => 'required|string|min:5',
            'name' => 'required|string|min:4',
            'lastName' => 'required|string|min:2',
            'location' => 'required|numeric|min:1',
        ],[
            'userName.required' => 'El nombre de usuario es obligatorio',
            'userName.min' => 'El nombre de usuario debe tener al menos 5 caracteres',
            
            'name.required' => 'El nombre es obligatorio',
            'name.min' => 'El nombre debe tener al menos 4 caracteres',
            
            'lastName.required' => 'El apellido es obligatorio',
            'lastName.min' => 'El apellido debe tener al menos 2 caracteres',
            
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
