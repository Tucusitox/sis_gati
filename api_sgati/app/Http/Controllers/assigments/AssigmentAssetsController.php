<?php

namespace App\Http\Controllers\assigments;

use App\Models\Asset;
use App\Models\Employee;
use Illuminate\Support\Facades\Validator;
use App\Models\EmployeesXAsset;
use Illuminate\Http\Request;

class AssigmentAssetsController
{
    // METODO PARA ASIGNAR UN ACTIVO A UN USUARIO DEL SISITEMA
    public function assigmentAsset(Request $request)
    {
        // VALIDAR CAMPOS DE LA PETICION
        $validator = Validator::make($request->all(), [
            'assetSerial' => 'required|string|min:10',
            'employeeUserName' => 'required|string|min:5',
        ], [
            'assetSerial.required' => 'Por favor, seleccione un equipo',
            'assetSerial.min' => 'El serial del equipo debe ser de mínimo 10 carácteres',
            'employeeUserName.required' => 'Por favor, seleccione un empleado',
            'employeeUserName.min' => 'El usuario del empleado debe ser de mínimo 5 carácteres',
        ]);

        // ENVIAR ERRORES DE VALIDACION AL FRONENT
        if ($validator->fails()) {
            return response()->json($validator->errors(), 404);
        }

        $Employee = Employee::select('id_employee')->where('employee_userName',$request->post('employeeUserName'))->first();
        $Asset = Asset::select('id_asset','asset_status')->where('asset_serial',$request->post('assetSerial'))->first();

        if ($Asset == null || $Employee == null) {
            return response()->json(['message' => 'El equipo o usuario no existe'], 400);
        }

        if ($Asset->asset_status === 'asignado') {
            return response()->json(['message' => 'El equipo ya se encuentra asignado a un empleado'], 400);
        }

        EmployeesXAsset::insert([
            'fk_employee' => $Employee->id_employee,
            'fk_asset' => $Asset->id_asset,
            'date_assignment' => now()->format('Y-m-d'),
        ]);

        Asset::find($Asset->id_asset)->update([
            'asset_status' => 'asignado',
        ]);

        return response()->json(['message' => 'Activo asignado con exito'], 200);
    }
}
