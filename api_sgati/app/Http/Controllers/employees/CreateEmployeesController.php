<?php

namespace App\Http\Controllers\employees;

use App\Http\Controllers\validators\ValidateEmployees;
use App\Models\Employee;
use Illuminate\Http\Request;

class CreateEmployeesController extends ValidateEmployees
{
    // METODO PARA CREAR UN NUEVO EMPLEADO
    public function createEmployee(Request $request)
    {
        // VALIDAR LOS CAMPOS DE CREACION
        $validation = $this->ValidateCreateAndUpdateEmployee($request);
        if ($validation) {
            return $validation;
        }

        Employee::insert([
            'fk_location' => $request->post('location'),
            'employee_userName' => $request->post('userName'),
            'employee_name' => $request->post('name'),
            'employee_lastName' => $request->post('lastName'),
        ]);

        return response()->json(['message'=>'Empleado registrado con exito'],200);    
    }
}
