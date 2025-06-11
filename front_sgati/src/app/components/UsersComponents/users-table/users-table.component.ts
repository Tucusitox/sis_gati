import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { SpinnerComponent } from '../../spinner/spinner.component';
import { ExportPdfComponent } from '../../export-pdf/export-pdf.component';
import { ExportExcelComponent } from '../../export-excel/export-excel.component';
import { AlertMessageComponent } from '../../alert-message/alert-message.component';
import { HeaderTablaUsuarios } from './itemsTablaUsers';
import { UsersService } from '../../../services/users.service';
import { GetUsers } from '../../../models/Users';
import { initFlowbite } from 'flowbite';
import { UsersCreateComponent } from '../users-create/users-create.component';
import { UserEditComponent } from '../user-edit/user-edit.component';

@Component({
  selector: 'app-users-table',
  imports: [
    CommonModule, FormsModule, NgxPaginationModule, 
    ExportExcelComponent, ExportPdfComponent, SpinnerComponent,
    AlertMessageComponent, UsersCreateComponent, UserEditComponent
  ],
  templateUrl: './users-table.component.html',
  styleUrl: './users-table.component.css'
})

export class UsersTableComponent {
  protected usersService = inject(UsersService); 
  protected typeTable: string = 'usuarios';
  protected itemsTable: any[] = [];
  protected filtrarItems: any[] = [];
  protected typeAsset: string = '';
  protected searchValue: string = '';
  protected headersTable: any[] = HeaderTablaUsuarios;
  protected openModalId: string | null = null;
  protected searchActivo: boolean = false;
  protected pageActual: number = 1;
  protected successEdit: boolean = false;
  protected successMessage: string = '';
  protected locationsEmployee: any[] = [];
  protected allRols: any[] = [];
  protected isCargando: boolean = false;

  ngOnInit(): void {
    this.getUsers();
    this.getRols();
    initFlowbite();
  };

  getUsers(){
    this.usersService.getAllUsers().subscribe({
      next: (resp:GetUsers[]) => {
        this.itemsTable = resp;
        this.filtrarItems = resp;
      },
      error: (err) => {
        if (err.status == 404 ) {
          console.log('Error Inesperado');
        }
      }
    });
  };

  findItem(event: string): void {
    const searchValue = event.toLowerCase().trim();
    this.itemsTable = this.filtrarItems.filter((item) => {
      return Object.values(item).some((value) =>
        String(value).toLowerCase().includes(searchValue)
      );
    });
    this.pageActual = 1;
    this.voidRequest();
  }

  getRols(){
    this.usersService.getAllRols().subscribe({
      next: (resp:any[]) => {
        this.allRols = resp;
      },
      error: (err) => {
        if (err.status == 404 ) {
          console.log('Error Inesperado');
        }
      }
    });
  };

  voidRequest() {
    return this.itemsTable.length === 0
      ? (this.searchActivo = true)
      : (this.searchActivo = false);
  }

  // ABRIR MODAL EDICION
  openModal(modalId: string) {
    this.openModalId = this.openModalId === modalId ? null : modalId;
  }

  editSucces(message: string) {
    this.ngOnInit();
    this.successEdit = true;
    this.successMessage = message;
  }

  // PARA CERRAR EL MODAL DE EDICION
  handleModalClosed() {
    this.openModalId = null;
  }

  // PARA ALERTAS
  onAlertClosed() {
    this.successEdit = false;
  }

  // PARA BLOQUEAR O DESBLOQUEAR USUARIOS
  blockDesblockUsers(typeAction:string, idUser:number){
    this.isCargando = true;
    this.usersService.blockAndDesblockUser(typeAction,idUser).subscribe({
      next: (resp) => {
        this.isCargando = false;
        this.editSucces(resp.message);
      },
      error: (err) => {
        if (err.status == 404 ) {
          console.log('Error Inesperado');
        }
      }
    });
  };
}
