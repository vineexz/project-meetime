import {
  ButtonsType,
  ChartsType,
  CycleType,
  EntitiesType,
  HeaderType,
  LabelsChartType,
} from './app.interface';

export const ENTITIES: EntitiesType = {
  title: 'Entidades à iniciar',
  subTitle:
    'Após o início, os eventos serão disponibilizados para execução nos dias que estão definidos em seus ciclos.',
  icon: 'play_arrow',
  labelRight: 'Entidades',
  labelEvents: 'Novos eventos para hoje',
  valueEvents: 0,
};
export const CYCLES: CycleType = {
  title: 'Selecione ciclos',
  titleTable: 'Ciclos com entidades disponíveis',
  subTitle: '(opcional)',
  priority: true,
  description:
    'Por padrão as entidades são selecionadas automaticamente de acordo com os ciclos que você participa e suas prioridades.',
};
export const CHART: ChartsType = {
  type: 'bar',
  colors: ['#34D399', '#9CA3AF', '#38BDF8', '#818CF8'],
  height: 400,
  stacked: true,
  showLegend: true,
  legendPosition: 'bottom',
  labelsEnable: false,
};

export const LABELS: LabelsChartType = {
  title: 'Previsão de eventos futuros',
  subTitle:
    'A previsão inclui eventos dos ciclos relacionados às entidades e é atualizada sempre que novas entidades forem iniciadas.',
};
export const BUTTONS: ButtonsType = {
  close: { label: 'Fechar', textColor: '#3A3D3C' },
  include: {
    label: 'Iniciar novas entidades',
    backGround: '#00732F',
    textColor: '#ffffff',
  },
};
export const HEADERS: HeaderType = {
  configClass: 'font-semibold text-2xl leading-6',
  label: 'Iniciar novas Entidades',
  iconName: 'close',
};

export const DAYS_LABELS = ['Seg', 'Ter', 'Qua', 'Quin', 'Sex'];

export const DEFAULT_SUNDAY = 0;
export const DEFAULT_SATURDAY = 0;

export const DAYS_ENUM = [1, 2, 3, 4, 5];
