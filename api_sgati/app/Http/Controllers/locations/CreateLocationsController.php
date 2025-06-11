<?php

namespace App\Http\Controllers\locations;

use App\Http\Controllers\validators\ValidateLocations;
use App\Models\Location;
use Illuminate\Http\Request;

class CreateLocationsController extends ValidateLocations
{
    // METODO PARA CREAR UNA NUEVA LOCACION
    public function createLocation(Request $request)
    {   
        $Validation = $this->ValidateCreateAndUpdateLocation($request);
        if ($Validation) {
            return $Validation;
        }

        Location::insert([
            "city" => $request->post('locationCity'),
            "sede" => $request->post('locationSede'),
            "store" => $request->post('locationStore'),
        ]);

        return response()->json(['message'=>'Locación registrada con exito'], 200);
    }
}
