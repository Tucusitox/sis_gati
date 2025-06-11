import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { HeaderTablaEmpleados } from './itemsTablaEmployees';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { ExportExcelComponent } from '../../export-excel/export-excel.component';
import { ExportPdfComponent } from '../../export-pdf/export-pdf.component';
import { SpinnerComponent } from '../../spinner/spinner.component';
import { EmployeesService } from '../../../services/employees.service';
import { GetEmployees } from '../../../models/Employees';
import { EmployeesEditComponent } from '../employees-edit/employees-edit.component';
import { AlertMessageComponent } from '../../alert-message/alert-message.component';

@Component({
  selector: 'app-employees-table',
  imports: [
    CommonModule, FormsModule, NgxPaginationModule, 
    ExportExcelComponent, ExportPdfComponent, SpinnerComponent,
    EmployeesEditComponent, AlertMessageComponent
  ],
  templateUrl: './employees-table.component.html',
  styleUrl: './employees-table.component.css',
})

export class EmployeesTableComponent implements OnInit {
  protected employeesService = inject(EmployeesService); 
  protected typeTable: string = 'empleados';
  protected itemsTable: any[] = [];
  protected filtrarItems: any[] = [];
  protected searchValue: string = '';
  protected headersTable: any[] = HeaderTablaEmpleados;
  protected openModalId: string | null = null;
  protected searchActivo: boolean = false;
  protected pageActual: number = 1;
  protected successEdit: boolean = false;
  protected successMessage: string = '';
  protected locationsEmployee: any[] = [];

  ngOnInit(): void {
    this.getEmployess();
    this.getLocationsEmployess();
  };

  getEmployess(){
    this.employeesService.getAllEmployees().subscribe({
      next: (resp:GetEmployees[]) => {
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

  getLocationsEmployess(){
    this.employeesService.getAllEditLocationsEmployee().subscribe({
      next: (resp:any[]) => {
        this.locationsEmployee = resp;
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
}
