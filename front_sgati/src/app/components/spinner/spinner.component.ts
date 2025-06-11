import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-spinner',
  imports: [],
  templateUrl: './spinner.component.html',
  styles: ``
})

export class SpinnerComponent {
  @Input() mensajeDeCarga:string = "Procesando";
}
