<?php

namespace Database\Seeders;

use App\Models\Location;
use App\Models\Rol;
use App\Models\TypeAsset;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        // ROLES DEL SISTEMA
        Rol::insert([
            ['rol_name' => 'Administrador'],
            ['rol_name' => 'Estandar'],
        ]);
        // USUARIOS DEFALT
        User::insert([
            [
                'fk_rol' => 1,
                'name' => 'Tucusitox',
                'email' => 'admin@gmail.com',
                'password' => Hash::make('Morian.-12345'),
                'status' => 'desconectado',
            ],
            [
                'fk_rol' => 2,
                'name' => 'Apolo',
                'email' => 'estan@gmail.com',
                'password' => Hash::make('12345678'),
                'status' => 'desconectado',
            ],
        ]);
        // TIPOS DE ACTIVOS DEFAULT
        TypeAsset::insert([
            ['typeAsset_name' => 'Computadora'],
            ['typeAsset_name' => 'Mouse'],
            ['typeAsset_name' => 'Monitor'],
            ['typeAsset_name' => 'Teclado'],
            ['typeAsset_name' => 'Impresora'],
        ]);
        // LOCACIONES DEFAULT
        Location::insert([
            [
                'city' => 'Caracas',
                'sede' => 'Fuerte Tiuna',
                'store' => 'Almacen-C',
            ],
            [
                'city' => 'Valencia',
                'sede' => 'San Diego',
                'store' => 'Almacen-V',
            ],
            [
                'city' => 'Maracay',
                'sede' => 'Las Delicias',
                'store' => 'Almacen-M',
            ],
            [
                'city' => 'Barquisimeto',
                'sede' => 'Catedra',
                'store' => 'Almacen-B',
            ],
        ]);
    }
}
