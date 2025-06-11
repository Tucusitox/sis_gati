<?php

namespace App\Http\Controllers\locations;

use App\Http\Controllers\validators\ValidateLocations;
use App\Models\Location;
use Illuminate\Http\Request;

class UpdateLocationsController extends ValidateLocations
{
    // METODO PARA ACTUALIZAR UNA LOCACION
    public function updateLocation(Request $request, int $idLocation)
    {
        $Validation = $this->ValidateCreateAndUpdateLocation($request);
        if ($Validation) {
            return $Validation;
        }

        Location::find($idLocation)->update([
            "city" => $request->post('locationCity'),
            "sede" => $request->post('locationSede'),
            "store" => $request->post('locationStore'),
        ]);

        return response()->json(['message' => 'Locación actualizada con exito'], 200);
    }
}
