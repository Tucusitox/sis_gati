<?php

namespace App\Http\Controllers\locations;

use App\Models\Location;

class GetLocationsController
{
    // METODO PARA CARGAR TODAS LAS LOCACIONES EXISTENTES
    public function getAllLocations()
    {
        $AllLocations = Location::all();
        return response()->json($AllLocations, 200);
    }
}
