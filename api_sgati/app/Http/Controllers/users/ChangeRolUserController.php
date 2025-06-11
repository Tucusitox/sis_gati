<?php

namespace App\Http\Controllers\users;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ChangeRolUserController
{
    // METODO PARA CAMBIAR EL ROL DEL USUARIO
    public function changeRol(Request $request, int $idUser)
    {
        // VALIDAR CAMPOS DE LA PETICION
        $validator = Validator::make($request->all(), [
            'userRol' => 'required|numeric|min:1',
        ],[
            'userRol.required' => 'El rol es obligatorio',
            'userRol.min' => 'Este rol no exite en el sistema',
        ]);

        // ENVIAR ERRORES DE VALIDACION AL FRONENT
        if ($validator->fails()) {
            return response()->json($validator->errors(), 404);
        }
        
        User::find($idUser)->update(['fk_rol' => $request->post('userRol')]);

        return response()->json(['message' => 'Rol cambiado con exito'], 200);
    }
}
