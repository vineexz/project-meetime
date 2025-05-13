import { CommonModule } from '@angular/common';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Subject, takeUntil, tap } from 'rxjs';

@Component({
  selector: 'meetime-input',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './input-meetime.component.html',
  styleUrl: './input-meetime.component.scss',
  standalone: true,
})
export class MeetimeInputComponent implements OnInit, OnDestroy {
  @Input() control: FormControl = new FormControl();
  @Input() placeholder: string = '';
  @Input() style: { [key: string]: string } = {};
  @Input() htmlType: string = 'text';
  @Input() maxLength: number = 0;
  @Input() minLength: number = 0;
  @Input() useMin = false;
  private readonly _COMPONENT_DESTROY$ = new Subject<void>();

  ngOnDestroy(): void {
    this._COMPONENT_DESTROY$.next();
    this._COMPONENT_DESTROY$.complete();
  }

  ngOnInit() {
    if (this.control && this.htmlType === 'number') {
      this._inputProcessing().subscribe();
    }
  }

  private _inputProcessing() {
    return this.control.valueChanges.pipe(
      takeUntil(this._COMPONENT_DESTROY$),
      tap((changedValue) => {
        if (changedValue > this.maxLength) {
          this.control.setValue(this.maxLength);
        }
        if (this.useMin && changedValue < this.minLength) {
          this.control.setValue(this.minLength);
        }
      })
    );
  }
}
