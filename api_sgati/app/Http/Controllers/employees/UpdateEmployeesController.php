<?php

namespace App\Http\Controllers\employees;

use App\Http\Controllers\validators\ValidateEmployees;
use App\Models\Employee;
use App\Models\Location;
use Illuminate\Http\Request;

class UpdateEmployeesController extends ValidateEmployees
{
    // METODO PARA ACTUALIZAR EMPLEADO
    public function updateEmployee(Request $request, int $idEmployee)
    {
        // VALIDAR LOS CAMPOS DE CREACION
        $validation = $this->ValidateCreateAndUpdateEmployee($request);
        if ($validation) {
            return $validation;
        }

        Employee::find($idEmployee)->update([
            'fk_location' => $request->post('location'),
            'employee_userName' => $request->post('userName'),
            'employee_name' => $request->post('name'),
            'employee_lastName' => $request->post('lastName'),
        ]);

        return response()->json(['message' => 'Empleado actualizado con exito'], 200);
    }

    // METODO PARA MOSTRAR LOCACIONES Y EDITARLAS
    public function updateEmployeeLocation()
    {
        $employeeUpdateLocations = Location::select('id_location')
        ->selectRaw("CONCAT(city,' ',sede) AS EmployeeLocations")
        ->get(); 

        return response()->json($employeeUpdateLocations, 200);
    }
}
