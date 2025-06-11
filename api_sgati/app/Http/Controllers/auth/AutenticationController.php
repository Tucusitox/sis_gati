<?php

namespace App\Http\Controllers\auth;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class AutenticationController
{   
    // METODO PARA AUTENTICAR USUARIOS
    public function autentication(Request $request)
    {   
        // VALIDAR CAMPOS DE LA PETICION
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|min:5',
            'password' => 'required|string|min:8',
        ]);

        // ENVIAR ERRORES DE VALIDACION AL FRONENT
        if ($validator->fails()) {
            return response()->json($validator->errors(), 404);
        }

        // BUSCAR LA INFORMACION DEL USUARIO
        $UserAuth = User::join('rols','rols.id_rol','=','users.fk_rol')
        ->where('name', $request->post('name'))
        ->first();

        // CASO 1: USUARIO BLOQUEADO DEL SISTEMA
        if ($UserAuth == null) {
            return response()->json(['message' => 'Este usuario no existe en el sistema'], 404);
        }

        // CASO 2: USUARIO BLOQUEADO DEL SISTEMA
        elseif ($UserAuth->status === 'conectado') {
            return response()->json(['message' => 'Este usuario ya tiene una sesión activa'], 404);
        }

        // CASO 3: USUARIO BLOQUEADO DEL SISTEMA
        elseif ($UserAuth->status === 'bloqueado') {
            return response()->json(['message' => 'Este usuario esta bloqueado del sistema'], 404);
        }

        // CASO 4: SI LAS CREDENCIALES SON INCORRECTAS
        elseif (!Auth::attempt($request->only('name', 'password'))) {
            return response()->json(['message' => 'Correo o contraseña incorrectos'], 404);
        }

        $UserAuth->status = 'conectado';
        $UserAuth->save();

        return response()
            ->json([
                'userRol' => $UserAuth->rol_name,
                'userName' => $UserAuth->name,
                'userEmail' => $UserAuth->email,
                'userToken' => $UserAuth->createToken('auth_token')->plainTextToken,
            ]);
    }

    // METODO PARA CERRAR SESION DE USUARIOS
    public function logout()
    {
        auth()->user()->tokens()->delete();
        User::find(Auth::id())->update(['status' => 'desconectado']);
        return response()->json(['message' => 'Sesión cerrada correctamente'], 200);
    }
}
