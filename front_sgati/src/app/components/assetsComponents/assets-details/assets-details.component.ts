import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-assets-details',
  imports: [ CommonModule ],
  templateUrl: './assets-details.component.html',
  styles: ``
})
export class AssetsDetailsComponent {
  @Input() idModal: string = "";
  @Input() isOpen: boolean = false;
  @Input() tittleModal: string = '';
  @Output() modalDetailClosed = new EventEmitter<void>();

  // VARIABLES A DETALLAR
  @Input() serial: string = "";
  @Input() model: string = "";
  @Input() mark: string = "";
  @Input() typeAsset: string = "";
  @Input() city: string = "";
  @Input() sede: string = "";
  @Input() store: string = "";
  @Input() dateRegister: string = "";
  @Input() status: string = "";
  @Input() usuarioAsignado: string = "";

  closeModal() {
    this.modalDetailClosed.emit();
  }
}
