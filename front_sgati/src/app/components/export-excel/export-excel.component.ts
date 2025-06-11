import { Component, Input } from '@angular/core';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-export-excel',
  imports: [],
  templateUrl: './export-excel.component.html',
})

export class ExportExcelComponent {
  @Input() headerTable:string[] = [];
  @Input() dataTable:any[] = [];
  @Input() typeTable:string = "";

  // METODO PARA EXPORTAR TABLA A EXCEL
  exportExcel() {
    // ARRAY CON DATOS DE LOS HEADERS
    const headers = this.headerTable
    let data:(string | number)[][] = []

    // EXPORTAR EXCEL PARA LOS ACTIVOS
    if (this.typeTable === "activos") {
      data = this.dataTable.map(item => {
        return [
          item.asset_serial || '',
          item.asset_model || '',
          item.asset_mark || '',
          item.asset_dateRegister || '',
          item.typeAsset_name || '',
        ];
      });
    };

    // EXPORTAR EXCEL PARA LOS EMPLEADOS
    if (this.typeTable === "empleados") {
      data = this.dataTable.map(item => {
        return [
          item.employee_userName || '',
          item.employee_name +' '+ item.employee_lastName || '',
          item.UbicacionEmpleado || '',
          item.ActivosAsignados || 0,
        ];
      });
    };

    // EXPORTAR EXCEL PARA LOS USUARIOS
    if (this.typeTable === "usuarios") {
      data = this.dataTable.map(item => {
        return [
          item.name || '',
          item.email || '',
          item.rol_name || '',
        ];
      });
    };

    // EXPORTAR EXCEL PARA LAS LOCACIONES
    if (this.typeTable === "locaciones") {
      data = this.dataTable.map(item => {
        return [
          item.city || '',
          item.sede || '',
          item.store || '',
        ];
      });
    };

    // EXPORTAR EXCEL PARA LOS TIPOS DE ACTIVOS
    if (this.typeTable === "tipoActivos") {
      data = this.dataTable.map(item => {
        return [
          item.id_typeAsset || '',
          item.typeAsset_name || '',
        ];
      });
    };

    // LLAMANDO LIBRERIA PARA EXPORTAR A EXCEL
    const worksheet = XLSX.utils.aoa_to_sheet([headers, ...data]);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, `Reporte de ${this.typeTable}`);
    XLSX.writeFile(workbook, `Reporte de ${this.typeTable}.xlsx`, { compression: true });
  }
}
