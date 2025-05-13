import { ChartType } from 'ng-apexcharts';

export enum DayEntities {
  monday = 1,
  tuesday = 2,
  wednesday = 3,
  thursday = 4,
  friday = 5,
}

export type EntitiesType = {
  title: string;
  subTitle: string;
  icon: string;
  labelRight: string;
  labelEvents: string;
  valueEvents: number;
};

export type CycleType = {
  title: string;
  titleTable: string;
  subTitle: string;
  priority: boolean;
  description: string;
};

export type ChartsType = {
  type: ChartType;
  colors: string[];
  height: number;
  stacked: boolean;
  showLegend: boolean;
  legendPosition: 'top' | 'left' | 'right' | 'bottom';
  labelsEnable: boolean;
};

export type EventCycle = {
  availableEntities: number;
  name: string;
  priority: string;
  selected: boolean;
  structure: StructureType[];
};

export type StructureType = {
  calls: number;
  day: number;
  emails: number;
  follows: number;
  meetings: number;
};

export type LabelsChartType = {
  title: string;
  subTitle: string;
};

export type ButtonsType = {
  close: { label: string; textColor: string };
  include: { label: string; backGround: string; textColor: string };
};

export type HeaderType = {
  configClass: string;
  label: string;
  iconName: string;
};
