import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { initFlowbite } from 'flowbite';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { NavbarComponent } from './components/navbar/navbar.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent, SidebarComponent],
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit{
  title = 'front_sgati';

  ngOnInit(): void {
    initFlowbite();
  }
}
