import {
  BUTONS_TYPE,
  CHART_TYPE,
  CYCLE_TYPE,
  ENTITIES_TYPE,
  HEADER_TYPE,
  LABELS_CHART_TYPE,
} from './app.interface';

export const ENTITIES: ENTITIES_TYPE = {
  TITLE: 'Entidades à iniciar',
  SUB_TITLE:
    'Após o início, os eventos serão disponibilizados para execução nos dias que estão definidos em seus ciclos.',
  ICON: 'play_arrow',
  LABEL_RIGHT: 'Entidades',
  LABEL_EVENTS: 'Novos eventos para hoje',
  VALUE_EVENTS: 0,
};
export const CYCLES: CYCLE_TYPE = {
  TITLE: 'Selecione ciclos',
  TITLE_TABLE: 'Ciclos com entidades disponíveis',
  SUBTITLE: '(opcional)',
  PRIORITY: true,
  DESCRIPTION:
    'Por padrão as entidades são selecionadas automaticamente de acordo com os ciclos que você participa e suas prioridades.',
};
export const CHART: CHART_TYPE = {
  TYPE: 'bar',
  COLORS: ['#34D399', '#9CA3AF', '#38BDF8', '#818CF8'],
  HEIGHT: 400,
  STACKED: true,
  SHOW_LEGEND: true,
  LEGEND_POSITION: 'bottom',
  LABELS_ENABLE: false,
};

export const LABELS: LABELS_CHART_TYPE = {
  TITLE: 'Previsão de eventos futuros',
  SUB_TITLE:
    'A previsão inclui eventos dos ciclos relacionados às entidades e é atualizada sempre que novas entidades forem iniciadas.',
};
export const BUTTONS: BUTONS_TYPE = {
  CLOSE: { LABEL: 'Fechar', TEXT_COLOR: '#3A3D3C' },
  INCLUDE: {
    LABEL: 'Iniciar novas entidades',
    BACKGROUND: '#00732F',
    TEXT_COLOR: '#ffffff',
  },
};
export const HEADERS: HEADER_TYPE = {
  CONFIG_CLASS: 'font-semibold text-2xl leading-6',
  LABEL: 'Iniciar novas Entidades',
  ICON_NAME: 'close',
};

export const DAYS_LABELS = ['Seg', 'Ter', 'Qua', 'Quin', 'Sex'];

export const DAYS_ENUM = [1, 2, 3, 4, 5];
