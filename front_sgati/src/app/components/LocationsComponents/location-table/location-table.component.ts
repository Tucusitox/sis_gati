import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { ExportExcelComponent } from '../../export-excel/export-excel.component';
import { ExportPdfComponent } from '../../export-pdf/export-pdf.component';
import { SpinnerComponent } from '../../spinner/spinner.component';
import { AlertMessageComponent } from '../../alert-message/alert-message.component';
import { HeaderTablaLocaciones } from './itemsTablaLocaciones';
import { LocationsService } from '../../../services/locations.service';
import { GetLocations } from '../../../models/Locations';
import { initFlowbite } from 'flowbite';
import { LocationCreateComponent } from '../location-create/location-create.component';
import { LocationUpdateComponent } from '../location-update/location-update.component';

@Component({
  selector: 'app-location-table',
  imports: [
    CommonModule, FormsModule, NgxPaginationModule, 
    ExportExcelComponent, ExportPdfComponent, 
    SpinnerComponent,AlertMessageComponent, 
    LocationCreateComponent, LocationUpdateComponent
  ],
  templateUrl: './location-table.component.html',
  styleUrl: './location-table.component.css'
})

export class LocationTableComponent implements OnInit {
  protected locationsService = inject(LocationsService); 
  protected itemsTable: any[] = [];
  protected filtrarItems: any[] = [];
  protected typeTable: string = 'locaciones';
  protected headersTable: any[] = HeaderTablaLocaciones;
  protected searchValue: string = '';
  protected searchActivo: boolean = false;
  protected pageActual: number = 1;
  protected isCargando: boolean = false;
  protected openModalId: string | null = null;
  protected successEdit: boolean = false;
  protected successMessage: string = '';

  ngOnInit(): void {
    this.getLocations();
    initFlowbite();
  };

  getLocations(){
    this.locationsService.getAllLocations().subscribe({
      next: (resp:GetLocations[]) => {
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
