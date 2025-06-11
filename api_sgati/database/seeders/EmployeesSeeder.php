<?php

namespace Database\Seeders;

use App\Models\Employee;
use App\Models\EmployeesXAsset;
use Illuminate\Database\Seeder;

class EmployeesSeeder extends Seeder
{
    public function run(): void
    {
        // INSERTANDO EMPLEADOS DEFAULT
        Employee::insert([
            [
                'fk_location' => 1,
                'employee_userName' => 'jmart',
                'employee_name' => 'Juan',
                'employee_lastName' => 'Martinez',
            ],
            [
                'fk_location' => 2,
                'employee_userName' => 'mcast',
                'employee_name' => 'Maria',
                'employee_lastName' => 'Castillo',
            ],
            [
                'fk_location' => 3,
                'employee_userName' => 'aojar',
                'employee_name' => 'Alberto',
                'employee_lastName' => 'Ojara',
            ],
            [
                'fk_location' => 1,
                'employee_userName' => 'cjime',
                'employee_name' => 'Cleiver',
                'employee_lastName' => 'Jimenez',
            ],
            [
                'fk_location' => 2,
                'employee_userName' => 'jdiaz',
                'employee_name' => 'Jesus',
                'employee_lastName' => 'Diaz',
            ],
            [
                'fk_location' => 3,
                'employee_userName' => 'lalva',
                'employee_name' => 'Luis',
                'employee_lastName' => 'Alvarez',
            ],
        ]);

        // INSERTANDO EMPLEADOS_X_ACTIVOS DEFAULTS
        EmployeesXAsset::insert([
            // Usuario 1 - activos 1, 2, 3
            ['fk_employee' => 1, 'fk_asset' => 1, 'date_assignment' => now()->format('Y-m-d')],
            ['fk_employee' => 1, 'fk_asset' => 2, 'date_assignment' => now()->format('Y-m-d')],
            ['fk_employee' => 1, 'fk_asset' => 3, 'date_assignment' => now()->format('Y-m-d')],
            
            // Usuario 2 - activos 4, 5, 6
            ['fk_employee' => 2, 'fk_asset' => 4, 'date_assignment' => now()->format('Y-m-d')],
            ['fk_employee' => 2, 'fk_asset' => 5, 'date_assignment' => now()->format('Y-m-d')],
            ['fk_employee' => 2, 'fk_asset' => 6, 'date_assignment' => now()->format('Y-m-d')],
            
            // Usuario 3 - activos 7, 8, 9
            ['fk_employee' => 3, 'fk_asset' => 7, 'date_assignment' => now()->format('Y-m-d')],
            ['fk_employee' => 3, 'fk_asset' => 8, 'date_assignment' => now()->format('Y-m-d')],
            ['fk_employee' => 3, 'fk_asset' => 9, 'date_assignment' => now()->format('Y-m-d')],
        ]);
    }
}
