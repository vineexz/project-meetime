import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'meetime-checkbox',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatIconModule,
  ],
  templateUrl: './checkbox-meetime.component.html',
  styleUrl: './checkbox-meetime.component.scss',
  standalone: true,
})
export class MeetimeCheckboxComponent {
  @Input() control!: FormControl;
  @Input() class = '';
  @Input() icon = 'check';
  @Output() changed = new EventEmitter<boolean>();

  emitChange() {
    this.changed.emit(this.control.value);
  }
}
