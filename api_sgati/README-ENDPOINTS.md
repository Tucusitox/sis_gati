*ENDPOINTS PÚBLICOS (SIN AUTENTICACIÓN):

--- POST http://127.0.0.1:8000/api/AuthUser

++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

*ENDPOINTS PROTEGIDOS (REQUIEREN AUTENTICACIÓN):

-- GET http://127.0.0.1:8000/api/AllAssets

-- GET http://127.0.0.1:8000/api/FindAsset/{idActivo}

-- POST http://127.0.0.1:8000/api/CreateAsset

-- PUT http://127.0.0.1:8000/api/UpdateAsset/{idActivo}

-- GET http://127.0.0.1:8000/api/UpdateAssetLocation

-- GET http://127.0.0.1:8000/api/UpdateViewTypeAsset

-- GET http://127.0.0.1:8000/api/AllEmployees

-- GET http://127.0.0.1:8000/api/FindEmployee/{idEmployee}

-- POST http://127.0.0.1:8000/api/CreateEmployee

-- PUT http://127.0.0.1:8000/api/UpdateEmployee/{idEmployee}

-- GET http://127.0.0.1:8000/api/EmployeesAvailables

-- GET http://127.0.0.1:8000/api/AssetsAvailables

-- POST http://127.0.0.1:8000/api/AssigmentAsset

-- POST http://127.0.0.1:8000/api/DeleteAssigment

-- GET http://127.0.0.1:8000/api/LogoutUser

++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

*ENDPOINTS SOLO PARA ADMINISTRADOR (REQUIEREN AUTENTICACION Y ROL DE ADMIN):

-- GET http://127.0.0.1:8000/api/AllLocations

-- POST http://127.0.0.1:8000/api/CreateLocation

-- PUT http://127.0.0.1:8000/api/UpdateLocation/{idLocation}

-- GET http://127.0.0.1:8000/api/AllTypeAssets

-- POST http://127.0.0.1:8000/api/CreateTypeAsset

-- PUT http://127.0.0.1:8000/api/UpdateTypeAsset/{idTypeAsset}

-- GET http://127.0.0.1:8000/api/AllUsers

-- POST http://127.0.0.1:8000/api/CreateUser

-- PUT http://127.0.0.1:8000/api/UpdateUser/{idUser}

-- PUT http://127.0.0.1:8000/api/BlockAndDesblockUser/{typeAccion}/{idUser}

-- PUT http://127.0.0.1:8000/api/ChangeRolUser/{idUser}