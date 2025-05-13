import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  signal,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { Subject, takeUntil, tap } from 'rxjs';
import { MeetimeCheckboxComponent } from '../../../core/checkbox-meetime/checkbox-meetime.component';
import { Cycle } from '../services/api.interface';

@Component({
  selector: 'ui-cycles',
  standalone: true,
  imports: [
    CommonModule,
    MatExpansionModule,
    MatIconModule,
    MeetimeCheckboxComponent,
  ],
  templateUrl: './cycles.component.html',
  styleUrl: './cycles.component.scss',
})
export class CyclesComponent implements OnInit, OnDestroy {
  @Input() title: string = 'title';
  @Input() titleTable: string = 'title table';
  @Input() subtitle: string = 'subtitle';
  @Input() description: string = 'description';
  @Input() icon: string = 'expand_more';
  @Input() labelLeft: string = 'Selecionados/Disponíveis';
  @Input() labelRight: string = 'Eventos para hoje';

  @Output() itemSelecionado = new EventEmitter<any>();

  @Input() panelOpenState: boolean = false;
  @Output() panelOpenStateChange = new EventEmitter<boolean>();

  @Input() showSubCyclesTable: boolean = true;
  @Output() showSubCyclesTableChange = new EventEmitter<boolean>();

  @Input() set checkedPriorityHigh(value: boolean) {
    this._checkedPriorityHigh = value;
  }

  @Input() set setCycles(value: Cycle[]) {
    if (Array.isArray(value)) this.cycles.set(value);
  }
  protected cycles = signal<Cycle[]>([]);
  private _checkedPriorityHigh = false;
  private _DESTROYER = new Subject<void>();
  controlsMap: { [key: string]: FormControl } = {};

  ngOnInit() {
    this._initializeCycleControls();
  }

  ngOnDestroy(): void {
    this._DESTROYER.next();
    this._DESTROYER.complete();
  }

  private _initializeCycleControls() {
    this.cycles().forEach((item, index) => {
      const control = new FormControl(false);
      const isPreSelected =
        this._checkedPriorityHigh && item.priority === 'HIGH';
      if (this._checkedPriorityHigh) {
        control.setValue(item.priority === 'HIGH');
      }

      if (isPreSelected) {
        control.setValue(true, { emitEvent: false });
        this.itemSelecionado.emit({ ...item, selected: true });
      }
      this.controlsMap[index] = control;

      control.valueChanges
        .pipe(
          takeUntil(this._DESTROYER),
          tap((value) =>
            this.itemSelecionado.emit({ ...item, selected: value })
          )
        )
        .subscribe();
    });
  }

  getControl(index: number): FormControl {
    return this.controlsMap[index];
  }

  onCheckboxChange(index: number, value: boolean) {
    const item = this.cycles()[index];
    this.itemSelecionado.emit({ ...item, selected: value });
  }

  togglePanelOpen() {
    this.panelOpenState = !this.panelOpenState;
    this.panelOpenStateChange.emit(this.panelOpenState);
  }

  toggleSubCycles() {
    this.showSubCyclesTable = !this.showSubCyclesTable;
    this.showSubCyclesTableChange.emit(this.showSubCyclesTable);
  }

  getTotalEventos(cycle: Cycle): number {
    return cycle.structure.reduce(
      (acc, item) =>
        acc + item.meetings + item.emails + item.calls + item.follows,
      0
    );
  }
}
