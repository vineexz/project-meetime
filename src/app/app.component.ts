import { CommonModule } from '@angular/common';
import {
  ChangeDetectorRef,
  Component,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { filter, tap } from 'rxjs';
import { MeetimeButtonComponent } from '../libs/core/btn-meetime/btn-meetime.component';
import { GraphicsChartComponent } from '../libs/ui/components/chart/graphics-chart.component';
import { CyclesComponent } from '../libs/ui/components/cycles/cycles.component';
import { EntitiesComponent } from '../libs/ui/components/entities/entities.component';
import { Cycle } from '../libs/ui/components/services/api.interface';
import { ApiService } from '../libs/ui/components/services/api.service';
import { HeaderComponent } from '../libs/ui/main/header/header.component';
import {
  BUTTONS,
  CHART,
  CYCLES,
  ENTITIES,
  HEADERS,
  LABELS,
} from './app.constants';
import {
  BUTONS_TYPE,
  CHART_TYPE,
  CYCLE_TYPE,
  ENTITIES_TYPE,
  EVENT_CYCLE,
  HEADER_TYPE,
  LABELS_CHART_TYPE,
} from './app.interface';
import { ChartServices } from './services/chart-services.service';
import { FormServices } from './services/form-services.service';

@Component({
  selector: 'app-root',
  imports: [
    HeaderComponent,
    CommonModule,
    MeetimeButtonComponent,
    EntitiesComponent,
    CyclesComponent,
    GraphicsChartComponent,
  ],
  providers: [FormServices, ChartServices],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  readonly CONST_ENTITIES: ENTITIES_TYPE = ENTITIES;
  readonly CONST_CYCLES: CYCLE_TYPE = CYCLES;
  readonly CONST_CHART: CHART_TYPE = CHART;
  readonly CONST_LABELS_CHART: LABELS_CHART_TYPE = LABELS;
  readonly CONST_BUTTONS: BUTONS_TYPE = BUTTONS;
  readonly CONST_HEADERS: HEADER_TYPE = HEADERS;
  valueNumberEvents = signal<number>(1);
  cyclosSignal = signal<Cycle[]>([]);
  chartData: ApexAxisChartSeries = [];
  chartCategories: string[] = [];
  chartColors: string[] = this.CONST_CHART.COLORS;

  form = inject(FormServices);
  private _api = inject(ApiService);
  private _chartServices = inject(ChartServices);
  private _currentDay!: number;
  private _cyclosUpdate = new Set<string>();

  constructor(private _cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.cyclosSignal.set(this._api.getApi.cycles);
    this._updateChartData(1);
    this._updateChartCategories(1);
    this._valueChangedEntities();
  }

  onItemSelectedCycles(item: EVENT_CYCLE) {
    if (!item) return;
    const cicloKey = item.name;

    const rotatedDays = this._chartServices.rotateWeekDays(this._currentDay);

    const alreadyAdded = this._cyclosUpdate.has(cicloKey);

    if (item.selected && !alreadyAdded) {
      item.structure.forEach((struct) => {
        const dayIndex = rotatedDays.findIndex((day) => day === struct.day);
        if (dayIndex !== -1) {
          this._chartServices.addIfExists(
            this.chartData,
            0,
            dayIndex,
            struct.meetings
          );
          this._chartServices.addIfExists(
            this.chartData,
            1,
            dayIndex,
            struct.emails
          );
          this._chartServices.addIfExists(
            this.chartData,
            2,
            dayIndex,
            struct.calls
          );
          this._chartServices.addIfExists(
            this.chartData,
            3,
            dayIndex,
            struct.follows
          );
        }
      });
      this._cyclosUpdate.add(cicloKey);
    }

    if (!item.selected && alreadyAdded) {
      item.structure.forEach((struct) => {
        const dayIndex = rotatedDays.findIndex((day) => day === struct.day);
        if (dayIndex !== -1) {
          this._chartServices.addIfExists(
            this.chartData,
            0,
            dayIndex,
            -struct.meetings
          );
          this._chartServices.addIfExists(
            this.chartData,
            1,
            dayIndex,
            -struct.emails
          );
          this._chartServices.addIfExists(
            this.chartData,
            2,
            dayIndex,
            -struct.calls
          );
          this._chartServices.addIfExists(
            this.chartData,
            3,
            dayIndex,
            -struct.follows
          );
        }
      });
      this._cyclosUpdate.delete(cicloKey);
    }
    this._updateTotalEventosDoDia();
    this.chartData = [...this.chartData];
  }

  private _updateChartData(day: number) {
    this._currentDay = day;
    const rotatedDays = this._chartServices.rotateWeekDays(day);
    const filteredEvents = this._chartServices.filterEvents(rotatedDays);
    this._updateChartCategories(this._currentDay);

    this.chartData = [
      {
        name: 'Meetings',
        data: [
          ...rotatedDays.map(
            (d) =>
              filteredEvents.find((event) => event.day === d)?.events
                .meetings || 0
          ),
        ],
      },
      {
        name: 'Emails',
        data: [
          ...rotatedDays.map(
            (d) =>
              filteredEvents.find((event) => event.day === d)?.events.emails ||
              0
          ),
        ],
      },
      {
        name: 'Calls',
        data: [
          ...rotatedDays.map(
            (d) =>
              filteredEvents.find((event) => event.day === d)?.events.calls || 0
          ),
        ],
      },
      {
        name: 'Follows',
        data: [
          ...rotatedDays.map(
            (d) =>
              filteredEvents.find((event) => event.day === d)?.events.follows ||
              0
          ),
        ],
      },
    ];
  }

  private _updateChartCategories(day: number) {
    const rotatedDays = this._chartServices.rotateWeekDays(day);
    this.chartCategories = this._chartServices.getWeekdayLabels(
      rotatedDays,
      day
    );
  }

  private _valueChangedEntities() {
    this.form.formGroupService.controls.entities.valueChanges
      .pipe(
        filter((value) => value !== 0),
        tap((value) => {
          if (value === 6) return;
          if (value) {
            this._updateChartData(Number(value));
            this._updateChartCategories(Number(value));
            this.cyclosSignal()
              .filter((cycle) => this._cyclosUpdate.has(cycle.name))
              .forEach((cycle) =>
                this.onItemSelectedCycles({ ...cycle, selected: true })
              );
            this._updateTotalEventosDoDia();
            this._cdr.detectChanges();
          }
        })
      )
      .subscribe();
  }

  private _updateTotalEventosDoDia() {
    const total = this._chartServices.totalEventsOnTheDay(
      this._chartServices.rotateWeekDays(this._currentDay),
      this._currentDay,
      this.chartData
    );
    this.valueNumberEvents.update(() => total);
  }
}
