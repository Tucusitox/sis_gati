<?php

namespace App\Http\Controllers\typeAssets;

use App\Http\Controllers\validators\ValidaTeTypeAssets;
use App\Models\TypeAsset;
use Illuminate\Http\Request;

class UpdateTypeAssets extends ValidaTeTypeAssets
{
    // METODO PARA ACTUALIZAR UN TIPO DE ACTIVO
    public function updateTypeAsset(Request $request, int $idTypeAsset)
    {
        $Validation = $this->ValidateCreateAndUpdateTypeAsset($request);
        if ($Validation) {
            return $Validation;
        }
        
        TypeAsset::find($idTypeAsset)->update([
            'typeAsset_name' => $request->post('typeAssetName'),
        ]);

        return response()->json(['message'=>'Tipo de activo actualizado con exito'], 200);
    } 
}
