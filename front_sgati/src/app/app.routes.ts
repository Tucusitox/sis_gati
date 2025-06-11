import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AuthValidateUser, NoAuthValidateUser, RolValidateUser, ValidateTimeExpiresToken } from './middlewares/auth-validate.guard';
import { LoginComponent } from './pages/login/login.component';
import { AllAssetsComponent } from './pages/all-assets/all-assets.component';
import { CreateAssetComponent } from './components/assetsComponents/create-asset/create-asset.component';
import { EmployeesTableComponent } from './components/EmployeesComponents/employees-table/employees-table.component';
import { EmployeesCreateComponent } from './components/EmployeesComponents/employees-create/employees-create.component';
import { UsersTableComponent } from './components/UsersComponents/users-table/users-table.component';
import { LocationTableComponent } from './components/LocationsComponents/location-table/location-table.component';
import { TypeAssetTableComponent } from './components/TypeAssetsComponents/type-asset-table/type-asset-table.component';
import { AssigmentComponent } from './components/assetsComponents/assigment/assigment.component';


export const routes: Routes = [
  // RUTA DEL LOGIN
  { path: '', canActivate:[AuthValidateUser], component: LoginComponent },
    
  //RUTAS EL DASHBOARD AGRUPADAS
  { 
      path: '', //--> SIN PREFIJO PARA LAS RUTAS 
      canActivate: [NoAuthValidateUser, ValidateTimeExpiresToken],
      children: [
          { path: 'dashboard', component: DashboardComponent }, 
          { path: 'activos', component: AllAssetsComponent },
          { path: 'crearActivo', component: CreateAssetComponent },
          { path: 'empleados', component: EmployeesTableComponent },
          { path: 'crearEmpleado', component: EmployeesCreateComponent },
          { path: 'asignarActivo', component: AssigmentComponent },
      ]
  },

  { 
      path: '', //--> SIN PREFIJO PARA LAS RUTAS ADMINISTRADOR
      canActivate: [NoAuthValidateUser, ValidateTimeExpiresToken, RolValidateUser],
      children: [
          { path: 'usuarios', component: UsersTableComponent }, 
          { path: 'locaciones', component: LocationTableComponent }, 
          { path: 'tiposActivos', component: TypeAssetTableComponent }, 
      ]
  }
];
