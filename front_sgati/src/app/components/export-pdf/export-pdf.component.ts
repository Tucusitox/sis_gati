import { Component, Input } from '@angular/core';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

@Component({
  selector: 'app-export-pdf',
  templateUrl: './export-pdf.component.html',
})
export class ExportPdfComponent {
  @Input() headerTable: string[] = [];
  @Input() dataTable: any[] = [];
  @Input() typeTable: string = "";

  exportPDF() {
    const doc = new jsPDF('landscape'); // Orientación horizontal
    // Título del documento
    doc.text(`Reporte de ${this.typeTable}`, 14, 10);
    // Procesar datos
    const data = this.processData();
    // Generar la tabla
    autoTable(doc, {
      head: [this.headerTable],
      body: data,
      startY: 20,
      styles: {
        fontSize: 8,
        cellPadding: 2,
        overflow: 'linebreak'
      },
      margin: { top: 15 }
    });
    // Guardar el PDF
    doc.save(`Reporte de ${this.typeTable}.pdf`);
  }

  private processData(): (string | number)[][] {
    // EXPORTAR PDF PARA ACTIVOS
    if (this.typeTable === "activos") {
      return this.dataTable.map(item => [
        item.asset_serial || '',
        item.asset_model || '',
        item.asset_mark || '',
        item.asset_dateRegister || '',
        item.typeAsset_name || '',
      ]);
    };

    // EXPORTAR PDF PARA EMPLEADOS
    if (this.typeTable === "empleados") {
      return this.dataTable.map(item => [
        item.employee_userName || '',
        item.employee_name +' '+ item.employee_lastName || '',
        item.UbicacionEmpleado || '',
        item.ActivosAsignados || 0,
      ]);
    };

    // EXPORTAR PDF PARA USUARIOS
    if (this.typeTable === "usuarios") {
      return this.dataTable.map(item => [
        item.name || '',
        item.email || '',
        item.rol_name || '',
      ]);
    };

    // EXPORTAR PDF PARA LOCACIONES
    if (this.typeTable === "locaciones") {
      return this.dataTable.map(item => [
        item.city || '',
        item.sede || '',
        item.store || '',
      ]);
    };

    // EXPORTAR PDF PARA TIPO DE ACTIVO
    if (this.typeTable === "tipoActivos") {
      return this.dataTable.map(item => [
          item.id_typeAsset || '',
          item.typeAsset_name || '',
      ]);
    };

    return [];
  }
}