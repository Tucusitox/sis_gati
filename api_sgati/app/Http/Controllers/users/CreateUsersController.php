<?php

namespace App\Http\Controllers\users;

use App\Http\Controllers\validators\ValidateUsers;
use Illuminate\Support\Facades\Hash;
use Illuminate\Http\Request;
use App\Models\User;

class CreateUsersController extends ValidateUsers
{
    // METODO PARA REGISTRAR UN NUEVO USUARIO EN EL SISTEMA
    public function createUser(Request $request)
    {
        // VALIDAR DATOS
        $Validation = $this->ValidateCreateUser($request);
        if ($Validation) {
            return $Validation;
        }

        User::insert([
            'fk_rol' => $request->post('userRol'),
            'name' => $request->post('userName'),
            'email' => $request->post('userEmail'),
            'password' => Hash::make($request->post('userPassword')),
            'status' => 'desconectado',
        ]);

        return response()->json(['message' => 'Usuario registrado con exito'], 200);
    }
}
