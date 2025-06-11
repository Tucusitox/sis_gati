<?php

namespace App\Http\Controllers\assigments;

use App\Models\Asset;
use App\Models\Employee;

class GetAssetsAvailable
{
    // METODO PARA TRAER LOS EMPLEADOS EN EL SELECTOR AL MOMENTO DE ASIGNAR
    public function getEmployeesXassets()
    {
        $EmployeesAvailables = Employee::select('id_employee', 'employee_userName')
        ->selectRaw("CONCAT(employee_name,' ',employee_lastName) AS nombreApellido")
        ->get();
        return response()->json($EmployeesAvailables, 200);
    }

    // METODO PARA TRAER TODOS LOS ACTIVOS DISPONIBLES PARA SELECTOR DEL FRONT
    public function getAssetsAvailable()
    {
        $AssetsAvailable = Asset::select('id_asset','asset_serial','asset_model','asset_mark')
        ->where('asset_status', 'disponible')
        ->get();
        return response()->json($AssetsAvailable, 200);
    }
}
