import { ChartType } from 'ng-apexcharts';

export enum DayEntities {
  MONDAY = 1,
  TUESDAY = 2,
  WEDNESDAY = 3,
  THURSDAY = 4,
  FRIDAY = 5,
}

export type ENTITIES_TYPE = {
  TITLE: string;
  SUB_TITLE: string;
  ICON: string;
  LABEL_RIGHT: string;
  LABEL_EVENTS: string;
  VALUE_EVENTS: number;
};

export type CYCLE_TYPE = {
  TITLE: string;
  TITLE_TABLE: string;
  SUBTITLE: string;
  PRIORITY: boolean;
  DESCRIPTION: string;
};

export type CHART_TYPE = {
  TYPE: ChartType;
  COLORS: string[];
  HEIGHT: number;
  STACKED: boolean;
  SHOW_LEGEND: boolean;
  LEGEND_POSITION: 'top' | 'left' | 'right' | 'bottom';
  LABELS_ENABLE: boolean;
};

export type EVENT_CYCLE = {
  availableEntities: number;
  name: string;
  priority: string;
  selected: boolean;
  structure: STRUCTURE_TYPE[];
};

export type STRUCTURE_TYPE = {
  calls: number;
  day: number;
  emails: number;
  follows: number;
  meetings: number;
};

export type LABELS_CHART_TYPE = {
  TITLE: string;
  SUB_TITLE: string;
};

export type BUTONS_TYPE = {
  CLOSE: { LABEL: string; TEXT_COLOR: string };
  INCLUDE: { LABEL: string; BACKGROUND: string; TEXT_COLOR: string };
};

export type HEADER_TYPE = {
  CONFIG_CLASS: string;
  LABEL: string;
  ICON_NAME: string;
};
