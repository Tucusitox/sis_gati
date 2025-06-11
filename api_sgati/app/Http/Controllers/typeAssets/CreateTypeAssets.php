<?php

namespace App\Http\Controllers\typeAssets;

use App\Http\Controllers\validators\ValidaTeTypeAssets;
use App\Models\TypeAsset;
use Illuminate\Http\Request;

class CreateTypeAssets extends ValidaTeTypeAssets
{
    // METODO PARA CREAR UN NUEVO TIPO DE ACTIVO
    public function createTypeAsset(Request $request)
    {
        $Validation = $this->ValidateCreateAndUpdateTypeAsset($request);
        if ($Validation) {
            return $Validation;
        }
        
        TypeAsset::insert([
            'typeAsset_name' => $request->post('typeAssetName'),
        ]);

        return response()->json(['message'=>'Tipo de activo registrado con exito'], 200);
    } 
}
