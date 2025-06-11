<?php

namespace App\Http\Controllers\users;

use App\Models\Rol;
use App\Models\User;

class GetUsersController
{
    // METODO PARA TRAER TODOS LOS USUARIOS DEL SISTEMA CON SU ROL
    public function getAllUsers()
    {
        $AllUsers = User::select('user_id','fk_rol','rol_name','name','email','status')
        ->join('rols','rols.id_rol','=','users.fk_rol')
        ->get();

        return response()->json($AllUsers, 200);
    }

    // METODO PARA TRAER TODOS LOS ROLES DEL SISTEMA
    public function getAllRols()
    {
        $AllRols = Rol::all();
        return response()->json($AllRols, 200);
    }
}
