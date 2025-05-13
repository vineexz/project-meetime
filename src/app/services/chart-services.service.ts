import { inject, Injectable } from '@angular/core';
import { DAYS_ENUM, DAYS_LABELS } from '../app.constants';
import { ApiService } from '../../libs/ui/components/services/api.service';

@Injectable()
export class ChartServices {
  private _api = inject(ApiService);

  addIfExists(
    chartData: ApexAxisChartSeries,
    serieIndex: number,
    dayIndex: number,
    valor: number
  ): number {
    return this._addIfExists(chartData, serieIndex, dayIndex, valor);
  }

  filterEvents(rotatedDays: number[]) {
    return this._getFilterEvents(rotatedDays);
  }

  rotateWeekDays(day: number) {
    return this._getRotatedWeekdays(day);
  }

  getWeekdayLabels(rotatedDays: number[], today: number) {
    return this._getWeekdayLabels(rotatedDays, today);
  }

  totalEventsOnTheDay(
    rotatedDays: number[],
    currentDay: number,
    chartData: ApexAxisChartSeries
  ) {
    return this.allEventsOfTheDay(rotatedDays, currentDay, chartData);
  }

  private _getFilterEvents(rotatedDays: number[]) {
    return this._api.getApi.eventsProjection.filter((event) =>
      rotatedDays.includes(event.day)
    );
  }

  private _getRotatedWeekdays(day: number): number[] {
    const weekdays = DAYS_ENUM;
    const result: number[] = [];

    const index = weekdays.indexOf(day);
    if (index === -1) return [];

    for (let i = 0; i < 5; i++) {
      const pos = (index + i) % weekdays.length;
      result.push(weekdays[pos]);
    }

    return result;
  }

  private _getWeekdayLabels(rotatedDays: number[], today: number): string[] {
    return rotatedDays.map((data, i) =>
      data === today && i === 0 ? 'Hoje' : DAYS_LABELS[data - 1]
    );
  }

  private allEventsOfTheDay(
    rotatedDays: number[],
    currentDay: number,
    chartData: ApexAxisChartSeries
  ) {
    const dayIndex = rotatedDays.findIndex((day) => day === currentDay);
    if (dayIndex === -1) return 0;

    const meetings =
      typeof chartData[0]?.data?.[dayIndex] === 'number'
        ? (chartData[0].data[dayIndex] as number)
        : 0;
    const emails =
      typeof chartData[1]?.data?.[dayIndex] === 'number'
        ? (chartData[1].data[dayIndex] as number)
        : 0;
    const calls =
      typeof chartData[2]?.data?.[dayIndex] === 'number'
        ? (chartData[2].data[dayIndex] as number)
        : 0;
    const follows =
      typeof chartData[3]?.data?.[dayIndex] === 'number'
        ? (chartData[3].data[dayIndex] as number)
        : 0;

    return meetings + emails + calls + follows;
  }

  private _addIfExists(
    chartData: ApexAxisChartSeries,
    serieIndex: number,
    dayIndex: number,
    valor: number
  ): number {
    const ponto = Number(chartData?.[serieIndex]?.data?.[dayIndex] ?? 0);
    const novoValor = ponto + Number(valor);

    const valorFinal = novoValor < 0 ? 0 : novoValor;

    chartData[serieIndex].data[dayIndex] = valorFinal;
    return valorFinal;
  }
}
