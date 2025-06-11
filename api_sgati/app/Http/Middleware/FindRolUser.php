<?php

namespace App\Http\Middleware;

use App\Models\User;
use Closure;
use Illuminate\Support\Facades\Auth;

class FindRolUser
{
    // PARA PROTEGER LAS RUTAS QUE SON SOLO DE ADMINISTRADOR
    public function handle($request, Closure $next)
    {
        $user = User::join('rols', 'users.fk_rol', '=', 'rols.id_rol')
        ->where('user_id', Auth::id())->first();

        if ($user && $user->rol_name === "Administrador") {
            return $next($request);
        }
        return response()->json(['message'=>'Este usuario no es administrador'], 505);
    }
}
