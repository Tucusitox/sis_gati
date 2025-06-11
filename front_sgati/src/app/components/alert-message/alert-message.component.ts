import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-alert-message',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './alert-message.component.html',
})
export class AlertMessageComponent implements OnChanges {
  @Input() message: string = '';
  @Input() typeAlert: string = 'danger';
  @Input() visible: boolean = false;
  @Input() cargando: boolean = false;
  @Output() closed = new EventEmitter<void>();

  private autoCloseTimeout: any;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['visible'] && this.visible) {
      this.setupAutoClose();
    }
  }

  closeAlert() {
    this.clearAutoClose();
    this.visible = false;
    this.closed.emit();
  }

  private setupAutoClose() {
    this.clearAutoClose();
    this.autoCloseTimeout = setTimeout(() => {
      this.closeAlert();
    }, 3000); // 3000 ms = 3 segundos
  }

  private clearAutoClose() {
    if (this.autoCloseTimeout) {
      clearTimeout(this.autoCloseTimeout);
      this.autoCloseTimeout = null;
    }
  }

  ngOnDestroy() {
    this.clearAutoClose();
  }
}