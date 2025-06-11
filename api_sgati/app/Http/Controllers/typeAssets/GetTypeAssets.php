<?php

namespace App\Http\Controllers\typeAssets;

use App\Models\TypeAsset;

class GetTypeAssets
{
    // METODO PARA CARGAR TODOS LOS TIPOS DE ACTIVOS
    public function getAllTypeAssets()
    {
        $AllTypeAssets = TypeAsset::all();
        return response()->json($AllTypeAssets, 200);    
    }
}
