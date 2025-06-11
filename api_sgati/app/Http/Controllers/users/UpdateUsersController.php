<?php

namespace App\Http\Controllers\users;

use App\Http\Controllers\validators\ValidateUsers;
use Illuminate\Http\Request;
use App\Models\User;

class UpdateUsersController extends ValidateUsers
{
    // METODO PARA ACTUALIZAR UN NUEVO USUARIO EN EL SISTEMA
    public function updateUser(Request $request, int $idUser)
    {
        // VALIDAR DATOS
        $Validation = $this->ValidateUpdateUser($request);
        if ($Validation) {
            return $Validation;
        }

        User::find($idUser)->update([
            'fk_rol' => $request->post('userRol'),
            'name' => $request->post('userName'),
            'email' => $request->post('userEmail'),
        ]);

        return response()->json(['message' => 'Usuario actualizado con exito'], 200);
    }

    // METODO PARA BLOQUEAR O BESBLOQUEAR UN USUARIO
    public function blockAndDesblockUser(string $typeAccion, int $idUser)
    {
        // acciones: "block" y "desblock"
        $UserStatus = $typeAccion === 'block' ? 'bloqueado' : 'desconectado';
        $Response = $typeAccion === 'block' 
        ? 'Usuario bloqueado con exito' 
        : 'Usuario desbloqueado con exito';

        User::find($idUser)->update(['status' => $UserStatus]);

        return response()->json(['message' => $Response], 200);
    }
}
