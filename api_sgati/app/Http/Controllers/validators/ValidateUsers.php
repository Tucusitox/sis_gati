<?php

namespace App\Http\Controllers\validators;

use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;

class ValidateUsers
{
    // METODO PARA VALIDAR LOS CAMPOS DE CREACION DE USUARIOS
    public function ValidateCreateUser(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'userRol' => 'required|numeric|min:1',
            'userName' => 'required|string|min:5|unique:users,name',
            'userEmail' => 'required|string|regex:/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/|unique:users,email',
            'userPassword' => 'required|string|min:8',
        ], [
            'userRol.required' => 'El rol del usuario es obligatorio',
            'userRol.min' => 'Este rol no exite en el sistema',
            'userName.required' => 'El nombre de usuario es obligatorio',
            'userName.unique' => 'Este nombre de usuario ya ha sido registrado',
            'userEmail.required' => 'El correo es obligatorio',
            'userEmail.regex' => 'El formato del correo es incorrecto',
            'userEmail.unique' => 'Este correo ya ha sido registrado',
            'userPassword.required' => 'La contraseña es obligatoria',
            'userPassword.min' => 'La contraseña debe tener un minino de 8 carácteres',
        ]);

        // ENVIAR ERRORES DE VALIDACION AL FRONENT
        if ($validator->fails()) {
            return response()->json($validator->errors(), 404);
        }
        
        return null;
    }

    // METODO PARA VALIDAR LOS CAMPOS DE EDICION DE USUARIOS
    public function ValidateUpdateUser(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'userRol' => 'required|numeric|min:1',
            'userName' => 'required|string|min:5',
            'userEmail' => 'required|string|regex:/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/',
        ], [
            'userRol.required' => 'El rol del usuario es obligatorio',
            'userRol.min' => 'Este rol no exite en el sistema',
            'userName.required' => 'El nombre de usuario es obligatorio',
            'userEmail.required' => 'El correo es obligatorio',
            'userEmail.regex' => 'El formato del correo es incorrecto',
        ]);

        // ENVIAR ERRORES DE VALIDACION AL FRONENT
        if ($validator->fails()) {
            return response()->json($validator->errors(), 404);
        }
        
        return null;
    }
}
