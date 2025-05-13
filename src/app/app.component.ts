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
  DEFAULT_SATURDAY,
  DEFAULT_SUNDAY,
  ENTITIES,
  HEADERS,
  LABELS,
} from './app.constants';
import {
  ButtonsType,
  ChartsType,
  CycleType,
  EntitiesType,
  EventCycle,
  HeaderType,
  LabelsChartType,
  StructureType,
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
  readonly CONST_ENTITIES: EntitiesType = ENTITIES;
  readonly CONST_CYCLES: CycleType = CYCLES;
  readonly CONST_CHART: ChartsType = CHART;
  readonly CONST_LABELS_CHART: LabelsChartType = LABELS;
  readonly CONST_BUTTONS: ButtonsType = BUTTONS;
  readonly CONST_HEADERS: HeaderType = HEADERS;

  valueNumberEvents = signal<number>(1);
  cyclosSignal = signal<Cycle[]>([]);

  chartData: ApexAxisChartSeries = [];
  chartCategories: string[] = [];
  chartColors: string[] = this.CONST_CHART.colors;

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

  onItemSelectedCycles(item: EventCycle, forceApply = false) {
    if (!item) return;
    const cicloKey = item.name;

    const rotatedDays = this._chartServices.rotateWeekDays(this._currentDay);

    const alreadyAdded = this._cyclosUpdate.has(cicloKey);

    if ((item.selected && !alreadyAdded) || forceApply) {
      this._applyCycleData(item.structure, rotatedDays, this.chartData, 1);
      this._cyclosUpdate.add(cicloKey);
    }

    if (!item.selected && alreadyAdded) {
      this._applyCycleData(item.structure, rotatedDays, this.chartData, -1);
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

    const metricKeys = ['meetings', 'emails', 'calls', 'follows'];
    const metricLabels = ['Meetings', 'Emails', 'Calls', 'Follows'];

    this.chartData = metricKeys.map((key, index) => ({
      name: metricLabels[index],
      data: rotatedDays.map((d) => {
        const event = filteredEvents.find((e) => e.day === d);
        return event?.events?.[key as keyof typeof event.events] ?? 0;
      }),
    }));
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
        filter((value) => value !== DEFAULT_SUNDAY),
        tap((value) => {
          if (value === DEFAULT_SATURDAY) return;
          if (value) {
            this._updateChartData(Number(value));
            this._updateChartCategories(Number(value));
            this.cyclosSignal()
              .filter((cycle) => this._cyclosUpdate.has(cycle.name))
              .forEach((cycle) =>
                this.onItemSelectedCycles({ ...cycle, selected: true }, true)
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

  private _applyCycleData(
    structure: StructureType[],
    rotatedDays: number[],
    chartData: ApexAxisChartSeries,
    multiplier: number
  ): void {
    structure.forEach((struct) => {
      const dayIndex = rotatedDays.findIndex((day) => day === struct.day);
      if (dayIndex === -1) return;

      this._chartServices.addIfExists(
        chartData,
        0,
        dayIndex,
        multiplier * struct.meetings
      );
      this._chartServices.addIfExists(
        chartData,
        1,
        dayIndex,
        multiplier * struct.emails
      );
      this._chartServices.addIfExists(
        chartData,
        2,
        dayIndex,
        multiplier * struct.calls
      );
      this._chartServices.addIfExists(
        chartData,
        3,
        dayIndex,
        multiplier * struct.follows
      );
    });
  }
}
