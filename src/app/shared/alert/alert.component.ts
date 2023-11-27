import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css'],
})
export class AlertComponent {
  @Input() msg = '';
  @Output() close: EventEmitter<void> = new EventEmitter<void>();

  onClose() {
    this.close.emit();
  }
}
