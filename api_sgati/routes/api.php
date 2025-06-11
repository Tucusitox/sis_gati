<?php

use App\Http\Controllers\activos\CreateAssetController;
use App\Http\Controllers\auth\AutenticationController;
use App\Http\Controllers\activos\GetAssetsController;
use App\Http\Controllers\activos\UpdateAssetController;
use App\Http\Controllers\assigments\AssigmentAssetsController;
use App\Http\Controllers\assigments\DeleteAssigmentController;
use App\Http\Controllers\assigments\GetAssetsAvailable;
use App\Http\Controllers\employees\CreateEmployeesController;
use App\Http\Controllers\employees\GetEmployeesController;
use App\Http\Controllers\employees\UpdateEmployeesController;
use App\Http\Controllers\locations\CreateLocationsController;
use App\Http\Controllers\locations\GetLocationsController;
use App\Http\Controllers\locations\UpdateLocationsController;
use App\Http\Controllers\typeAssets\CreateTypeAssets;
use App\Http\Controllers\typeAssets\GetTypeAssets;
use App\Http\Controllers\typeAssets\UpdateTypeAssets;
use App\Http\Controllers\users\ChangeRolUserController;
use App\Http\Controllers\users\CreateUsersController;
use App\Http\Controllers\users\GetUsersController;
use App\Http\Controllers\users\UpdateUsersController;
use App\Http\Middleware\FindRolUser;
use Illuminate\Support\Facades\Route;

// ENDPOINT GENERAL: http://127.0.0.1:8000/api/

// RUTA DE AUTENTICACION DE USUARIOS
Route::post('/AuthUser', [AutenticationController::class, 'autentication']);

// RUTAS PROTEJIDAS POR MIDDLEWARE DE AUTENTICACION
Route::middleware(['auth:sanctum'])->group(function(){

    // RUTAS PARA CRUD DE ACTIVOS
    Route::get('/AllAssets', [GetAssetsController::class, 'getAllAssets']);
    Route::get('/FindAsset/{idActivo}', [GetAssetsController::class, 'findAsset']);
    Route::post('/CreateAsset', [CreateAssetController::class, 'createAsset']);
    Route::put('/UpdateAsset/{idActivo}', [UpdateAssetController::class, 'updateAsset']);
    Route::get('/UpdateAssetLocation', [UpdateAssetController::class, 'updateAssetLocation']);
    Route::get('/UpdateViewTypeAsset', [UpdateAssetController::class, 'updateViewTypeAsset']);

    // RUTAS PARA CRUD EMPLEADOS
    Route::get('/AllEmployees', [GetEmployeesController::class, 'getAllEmployees']);
    Route::get('/FindEmployee/{idEmployee}', [GetEmployeesController::class, 'findEmployee']);
    Route::get('/UpdateLocationEmployee', [UpdateEmployeesController::class, 'updateEmployeeLocation']);
    Route::post('/CreateEmployee', [CreateEmployeesController::class, 'createEmployee']);
    Route::put('/UpdateEmployee/{idEmployee}', [UpdateEmployeesController::class, 'updateEmployee']);

    // RUTAS PARA (ACTIVOS DISPONIBLE, ASIGANAR, REASIGNAR Y LIBERAR) UN ACTIVO
    Route::get('/EmployeesAvailables', [GetAssetsAvailable::class, 'getEmployeesXassets']);
    Route::get('/AssetsAvailables', [GetAssetsAvailable::class, 'getAssetsAvailable']);
    Route::post('/AssigmentAsset', [AssigmentAssetsController::class, 'assigmentAsset']);
    Route::post('/DeleteAssigment', [DeleteAssigmentController::class, 'deleteAssigmentAsset']);

    // RUTA APRA CERRAR SECION
    Route::get('/LogoutUser', [AutenticationController::class, 'logout']);
});

// RUTAS SOLO PARA ADMINISTRADOR
Route::middleware(['auth:sanctum', FindRolUser::class])->group(function(){

    // RUTAS PARA CRUD LOCACIONES
    Route::get('/AllLocations', [GetLocationsController::class, 'getAllLocations']);
    Route::post('/CreateLocation', [CreateLocationsController::class, 'createLocation']);
    Route::put('/UpdateLocation/{idLocation}', [UpdateLocationsController::class, 'updateLocation']);

    // RUTAS CRUD TIPOS DE ACTIVOS
    Route::get('/AllTypeAssets', [GetTypeAssets::class, 'getAllTypeAssets']);
    Route::post('/CreateTypeAsset', [CreateTypeAssets::class, 'createTypeAsset']);
    Route::put('/UpdateTypeAsset/{idTypeAsset}', [UpdateTypeAssets::class, 'updateTypeAsset']);

    // RUTAS CRUD USUARIOS DEL SISTEMA
    Route::get('/AllUsers', [GetUsersController::class, 'getAllUsers']);
    Route::get('/AllRols', [GetUsersController::class, 'getAllRols']);
    Route::post('/CreateUser', [CreateUsersController::class, 'createUser']);
    Route::put('/UpdateUser/{idUser}', [UpdateUsersController::class, 'updateUser']);

    // RUTAS PARA BLOQUEAR O DESBLOQUEAR USUARIOS (tipos de acciones: "block" y "desblock")
    Route::put('/BlockAndDesblockUser/{typeAccion}/{idUser}', [UpdateUsersController::class, 'blockAndDesblockUser']);

    // RUTA PARA CAMBIAR EL ROL DEL USUARIO
    Route::put('/ChangeRolUser/{idUser}', [ChangeRolUserController::class, 'changeRol']);
});