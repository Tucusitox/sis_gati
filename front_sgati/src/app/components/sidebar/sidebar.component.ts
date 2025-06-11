import { AuthenticationService } from '../../services/authentication.service';
import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SidebarItems } from './SidebarItems'
import { initFlowbite } from 'flowbite';

@Component({
  selector: 'app-sidebar',
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './sidebar.component.html',
})

export class SidebarComponent implements OnInit {
  private authService = inject(AuthenticationService);
  protected userData:any = localStorage.getItem('userAuthData');
  protected userAuthData:any = JSON.parse(this.userData) ||  null;
  protected userRol:string = (this.userAuthData && this.userAuthData.userRol) || '';
  protected activeIndex: number | null = null;
  protected SidebarData = SidebarItems

  ngOnInit(): void {
    initFlowbite();
  }

  // ABRIR Y CERRAR ACORDEON
  toggleAccordion(index: number) {
    if (this.activeIndex === index) {
      this.activeIndex = null; // cerrar si ya estaba abierto
    } else {
      this.activeIndex = index; // abrir otro
    }
  }

  // VALIDAR ROL PARA EVALUAR QUE MOSTRAR EN EL SIDEBAR
  tieneAcceso(rolesPermitidos: string[]): boolean {
    if (!rolesPermitidos || rolesPermitidos.length === 0) {
      return false;
    }
    return rolesPermitidos.includes(this.userRol);
  }

  // METODO PARA CERRAR SESION
  cerrarSesion() {
    this.authService.logoutUser().subscribe({
      next: (resp) => {
        if (resp.status == 200) {
          localStorage.removeItem('userAuthData');
          localStorage.removeItem('logeado');
          window.location.reload();
        } 
      },
      error: (err) => { console.log(err) }
    });
  }
}

