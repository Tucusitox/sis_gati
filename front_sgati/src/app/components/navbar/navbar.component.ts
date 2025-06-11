import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { initFlowbite } from 'flowbite';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, CommonModule],
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {
  protected navbarIsVisible:any = localStorage.getItem('userAuthData');

  // EJECUTAR LIBRERIA DE COMPONENTES DE TAILWINDCSS
  ngOnInit(): void {
    initFlowbite();
  }
}
