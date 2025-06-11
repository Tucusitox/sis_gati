import { Component, inject } from '@angular/core';
import { HeaderTablaTipoActivos } from './itemsTablaTipoActivos';
import { initFlowbite } from 'flowbite';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { ExportExcelComponent } from '../../export-excel/export-excel.component';
import { ExportPdfComponent } from '../../export-pdf/export-pdf.component';
import { SpinnerComponent } from '../../spinner/spinner.component';
import { AlertMessageComponent } from '../../alert-message/alert-message.component';
import { TypeAssetService } from '../../../services/type-asset.service';
import { GetTypeAssets } from '../../../models/TypeAssets';
import { TypeAssetCreateComponent } from '../type-asset-create/type-asset-create.component';
import { TypeAssetEditComponent } from '../type-asset-edit/type-asset-edit.component';

@Component({
  selector: 'app-type-asset-table',
  imports: [
    CommonModule, FormsModule, NgxPaginationModule, 
    ExportExcelComponent, ExportPdfComponent, 
    SpinnerComponent,AlertMessageComponent, 
    TypeAssetCreateComponent, TypeAssetEditComponent,
  ],
  templateUrl: './type-asset-table.component.html',
  styleUrl: './type-asset-table.component.css'
})

export class TypeAssetTableComponent {
  protected typeAssetService = inject(TypeAssetService); 
  protected itemsTable: any[] = [];
  protected filtrarItems: any[] = [];
  protected typeTable: string = 'tipoActivos';
  protected headersTable: any[] = HeaderTablaTipoActivos;
  protected searchValue: string = '';
  protected searchActivo: boolean = false;
  protected pageActual: number = 1;
  protected isCargando: boolean = false;
  protected openModalId: string | null = null;
  protected successEdit: boolean = false;
  protected successMessage: string = '';

  ngOnInit(): void {
    this.getTypeAssets();
    initFlowbite();
  };

  getTypeAssets(){
    this.typeAssetService.getAllTypeAssets().subscribe({
      next: (resp:GetTypeAssets[]) => {
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
