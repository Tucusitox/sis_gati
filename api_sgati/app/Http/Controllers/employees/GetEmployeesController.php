<?php

namespace App\Http\Controllers\employees;

use App\Models\Employee;

class GetEmployeesController
{
    // METODO PARA TRAER TODOS LOS EMPLEADOS 
    // CON SU CANTIDAD DE ACTIVOS ASIGNADOS
    public function getAllEmployees()
    {   
        $AllEmployees = Employee::select('fk_location','id_employee','employee_userName','employee_name','employee_lastName')
        ->selectRaw("CONCAT(city,' ',sede) AS UbicacionEmpleado")
        ->selectRaw('COUNT(employees_x_assets.fk_employee) AS ActivosAsignados')
        ->leftjoin('employees_x_assets','employees_x_assets.fk_employee','=','employees.id_employee')
        ->leftjoin('locations','locations.id_location','=','employees.fk_location')
        ->groupBy('fk_location','id_employee', 'employee_userName', 'employee_name', 'employee_lastName','city','sede')
        ->get();

        return response()->json($AllEmployees, 200);        
    }

    // METODO PARA BUSCAR UN EMPLEADO CON ID
    // Y VER TODOS SUS ACTIVOS ASIGNADOS
    public function findEmployee(int $idEmployee)
    {
        $DataEmployee = Employee::select('id_employee','employee_userName')
        ->selectRaw("CONCAT(employee_name,' ',employee_lastName) AS NombreApellido")
        ->selectRaw("CONCAT(city,' ',sede) AS UbicacionEmpleado")
        ->leftjoin('employees_x_assets','employees_x_assets.fk_employee','=','employees.id_employee')
        ->leftjoin('assets','employees_x_assets.fk_asset','=','assets.id_asset')
        ->leftjoin('locations','locations.id_location','=','employees.fk_location')
        ->where('employees.id_employee',$idEmployee)
        ->first();

        $AssetsEmployee = Employee::select('id_asset','asset_serial','asset_model',
            'asset_mark','asset_dateRegister','typeAsset_name')
        ->join('employees_x_assets','employees_x_assets.fk_employee','=','employees.id_employee')
        ->join('assets','employees_x_assets.fk_asset','=','assets.id_asset')
        ->join('type_assets','type_assets.id_typeAsset','=','assets.fk_typeAsset')
        ->join('locations','locations.id_location','=','employees.fk_location')
        ->where('employees.id_employee',$idEmployee)
        ->get();

        return response()->json([
            'DataEmployee'=>$DataEmployee, 
            'AssetsEmployee'=>$AssetsEmployee
        ],200);    
    }
}
