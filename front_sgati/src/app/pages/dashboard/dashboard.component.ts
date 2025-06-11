import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, RouterLink],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent {
  protected userData:any = localStorage.getItem('userAuthData');
  protected userAuthData:any = JSON.parse(this.userData) ||  null;
  protected userRol:string = (this.userAuthData && this.userAuthData.userRol) || '';

  // CON ESTE ARRAY DE OBJETOS SE PUEDEN AGREGAR 
  // N-CANTIDAD DE CARDS AL DASHBOARD 
  // EN CASO DE NECESITAR CREAR MAS MODULOS
  itemsCards = [
    {
      icon: 'bx bxs-dashboard',
      rolesPermitidos: ['Administrador', 'Estandar'],
      title: 'Gestionar Activos',
      links: [
        { name: 'Activos', route: '/activos' },
        { name: 'Crear Activo', route: '/crearActivo' },
        { name: 'Asignar Activo', route: '/asignarActivo' }
      ]
    },
    {
      icon: 'bx bxs-dashboard',
      rolesPermitidos: ['Administrador', 'Estandar'],
      title: 'Gestionar Empleados',
      links: [
        { name: 'Empleados', route: '/empleados' },
        { name: 'Crear Empleado', route: '/crearEmpleado' },
      ]
    },
    {
      icon: 'bx bxs-dashboard',
      rolesPermitidos: ['Administrador'],
      title: 'Opciones Avanzadas',
      links: [
        { name: 'Usuarios', route: '/usuarios' },
        { name: 'Locaciones', route: '/locaciones' },
        { name: 'Tipos de Activos', route: '/tiposActivos' }
      ]
    }
  ];

  // VALIDAR ROL PARA EVALUAR QUE MOSTRAR EN EL SIDEBAR
  tieneAcceso(rolesPermitidos: string[]): boolean {
    if (!rolesPermitidos || rolesPermitidos.length === 0) {
      return false;
    }
    return rolesPermitidos.includes(this.userRol);
  }
}
