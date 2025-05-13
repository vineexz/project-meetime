import { CommonModule } from '@angular/common';
import {
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexLegend,
  ApexOptions,
  ChartComponent,
  NgApexchartsModule,
} from 'ng-apexcharts';
import { CHART_OPTIONS_MOCK } from './grapics-chart.mock';

@Component({
  selector: 'ui-chart',
  standalone: true,
  imports: [CommonModule, NgApexchartsModule],
  templateUrl: './graphics-chart.component.html',
  styleUrls: ['./graphics-chart.component.scss'],
})
export class GraphicsChartComponent implements OnChanges {
  @ViewChild('chart') chart!: ChartComponent;
  @Input() series: ApexAxisChartSeries = [];
  @Input() categories?: string[];
  @Input() chartType?: ApexChart['type'];
  @Input() chartHeight?: number;
  @Input() stacked?: boolean;
  @Input() showLegend?: boolean;
  @Input() legendPosition?: ApexLegend['position'];
  @Input() dataLabelsEnabled?: boolean;
  @Input() colors?: string[];
  @Input() yAxisTitle: string = 'Quantidade de Eventos';

  chartOptions: ApexOptions = { ...CHART_OPTIONS_MOCK };

  ngOnChanges(changes: SimpleChanges): void {
    this.chartOptions = {
      ...CHART_OPTIONS_MOCK,
      series: this.series ?? CHART_OPTIONS_MOCK.series,
      chart: {
        ...CHART_OPTIONS_MOCK.chart!,
        type: this.chartType ?? CHART_OPTIONS_MOCK.chart!.type!,
        height: this.chartHeight ?? CHART_OPTIONS_MOCK.chart!.height!,
        stacked: this.stacked ?? CHART_OPTIONS_MOCK.chart!.stacked!,
      },
      dataLabels: {
        enabled:
          this.dataLabelsEnabled ?? CHART_OPTIONS_MOCK.dataLabels!.enabled!,
      },
      colors: this.colors ?? CHART_OPTIONS_MOCK.colors!,
      xaxis: {
        ...CHART_OPTIONS_MOCK.xaxis!,
        categories: this.categories ?? CHART_OPTIONS_MOCK.xaxis!.categories!,
      },
      legend: {
        ...CHART_OPTIONS_MOCK.legend!,
        show: this.showLegend ?? CHART_OPTIONS_MOCK.legend!.show!,
        position: this.legendPosition ?? CHART_OPTIONS_MOCK.legend!.position!,
      },
    };
    this.chart?.updateOptions(this.chartOptions, true, true);
    this.chart?.updateSeries([...this.series], true);
  }
}
