import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { NgxPaginationModule } from 'ngx-pagination'
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ExportExcelComponent } from '../../export-excel/export-excel.component';
import { ExportPdfComponent } from '../../export-pdf/export-pdf.component';
import { SpinnerComponent } from '../../spinner/spinner.component';
import { HeaderTablaActivos } from './itemsTablaAssets';
import { AlertMessageComponent } from '../../alert-message/alert-message.component';
import { EditAssetsComponent } from '../edit-assets/edit-assets.component';
import { AssetsDetailsComponent } from '../assets-details/assets-details.component';


@Component({
  selector: 'app-assets-table',
  imports: [
    CommonModule, FormsModule, ExportExcelComponent, 
    ExportPdfComponent, SpinnerComponent, NgxPaginationModule, 
    EditAssetsComponent, AlertMessageComponent, AssetsDetailsComponent
  ],
  templateUrl: './assets-table.component.html',
  styleUrl: './assets-tabla.component.css', 
})

export class AssetsTableComponent implements OnChanges {
  @Input() typeTable: string = '';
  @Input() itemsTable: any[] = [];
  @Input() filtrarItems: any[] = [];
  @Input() locationAsset: any[] = [];
  @Input() typeAsset: string = '';
  @Input() typeAssetUpdateModal: any[] = [];
  @Output() refresComponent = new EventEmitter<void>();
  protected searchValue: string = '';
  protected headersTable: any[] = HeaderTablaActivos;
  protected openModalId: string | null = null;
  protected searchActivo: boolean = false;
  protected pageActual: number = 1;
  protected successEdit: boolean = false;
  protected successMessage: string = '';

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['typeAsset'] && changes['typeAsset'].previousValue !== undefined) {
      this.findItem(changes['typeAsset'].currentValue);
    }
  };

  findItem(event: string): void {
    const searchValue = event.toLowerCase().trim();
    this.itemsTable = this.filtrarItems.filter(item => {
      return Object.values(item).some(value => 
        String(value).toLowerCase().includes(searchValue)
      );
    });
    this.pageActual = 1;
    this.voidRequest();
  };

  voidRequest(){
    return this.itemsTable.length === 0 
    ? this.searchActivo = true 
    : this.searchActivo = false; 
  };

  // ABRIR MODAL EDICION
  openModal(modalId: string) {
    this.openModalId = this.openModalId === modalId ? null : modalId;
  };

  editSucces(message:string){
    this.refresComponent.emit();
    this.successEdit = true;
    this.successMessage = message;
  };

  // PARA CERRAR EL MODAL DE EDICION
  handleModalClosed() {
    this.openModalId = null;
  };

  // PARA ALERTAS
  onAlertClosed() {
    this.successEdit = false;
  };
}
