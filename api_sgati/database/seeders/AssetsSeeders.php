<?php

namespace Database\Seeders;

use App\Models\Asset;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class AssetsSeeders extends Seeder
{
    public function run(): void
    {
        // ORDENANDO DATOS DEFAULT
        $assetsAsignados = [];
        $assetsDisponibles = [];

        for ($i = 1; $i <= 3; $i++) { 
            $assetsAsignados[] = [
                'fk_typeAsset' => 1,
                'fk_location' => 1,
                'asset_serial' => strtoupper(Str::random(10)),
                'asset_model' => strtoupper(Str::random(4)),
                'asset_mark' => 'SAMSUNG',
                'asset_dateRegister' => '2025-04-15',
                'asset_status' => 'asignado',
            ];
            
            $assetsAsignados[] = [
                'fk_typeAsset' => 2,
                'fk_location' => 2,
                'asset_serial' => strtoupper(Str::random(10)),
                'asset_model' => strtoupper(Str::random(4)),
                'asset_mark' => 'DELL',
                'asset_dateRegister' => '2025-04-16',
                'asset_status' => 'asignado',
            ];

            $assetsAsignados[] = [
                'fk_typeAsset' => 3,
                'fk_location' => 3,
                'asset_serial' => strtoupper(Str::random(10)),
                'asset_model' => strtoupper(Str::random(4)),
                'asset_mark' => 'DELUX',
                'asset_dateRegister' => '2025-04-17',
                'asset_status' => 'asignado',
            ];
        }

        for ($i = 1; $i <= 50; $i++) {
            
            $assetsDisponibles[] = [
                'fk_typeAsset' => 4,
                'fk_location' => 4,
                'asset_serial' => strtoupper(Str::random(10)),
                'asset_model' => strtoupper(Str::random(4)),
                'asset_mark' => 'LENOVO',
                'asset_dateRegister' => '2025-04-18',
                'asset_status' => 'disponible',
            ];
            
            $assetsDisponibles[] = [
                'fk_typeAsset' => 5,
                'fk_location' => 4,
                'asset_serial' => strtoupper(Str::random(10)),
                'asset_model' => strtoupper(Str::random(4)),
                'asset_mark' => 'HP',
                'asset_dateRegister' => '2025-04-19',
                'asset_status' => 'disponible',
            ];
        }

        // INSERTANDO ACTIVOS DEFAULT 109 REGISTROS
        Asset::insert($assetsAsignados);
        Asset::insert($assetsDisponibles);
    }
}
