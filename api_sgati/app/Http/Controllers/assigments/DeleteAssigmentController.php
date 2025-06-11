<?php

namespace App\Http\Controllers\assigments;

use App\Models\Asset;
use App\Models\EmployeesXAsset;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;

class DeleteAssigmentController
{
    // METODO PARA LIBERAR UN ACTIVO ASIGNADO A UN USUARIO
    public function deleteAssigmentAsset(Request $request)
    {
                // VALIDAR CAMPOS DE LA PETICION
        $validator = Validator::make($request->all(), [
            'assetSerialDelete' => 'required|string|min:10',
        ], [
            'assetSerialDelete.required' => 'Por favor, seleccione un equipo',
            'assetSerialDelete.min' => 'El serial del equipo debe ser de mínimo 10 carácteres',
        ]);

        // ENVIAR ERRORES DE VALIDACION AL FRONENT
        if ($validator->fails()) {
            return response()->json($validator->errors(), 404);
        }

        $Asset = Asset::where('asset_serial',$request->post('assetSerialDelete'))->first();

        if ($Asset == null) {
            return response()->json(['message' => 'El equipo no existe'], 400);
        }

        EmployeesXAsset::where('fk_asset', $Asset->id_asset)->delete();
        $Asset->asset_status = 'disponible';
        $Asset->save();

        return response()->json(['message' => 'Activo liberado con exito'], 200);
    }
}
