import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'meetime-button',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './btn-meetime.component.html',
  styleUrl: './btn-meetime.component.scss',
  standalone: true,
})
export class MeetimeButtonComponent {
  @Input() labelButton: string = '';
  @Input() colorBackground: string = '';
  @Input() textColor: string = '';
  @Output() buttonClick = new EventEmitter<Event>();

  clickButton(event: Event) {
    this.buttonClick.emit(event);
  }
}
