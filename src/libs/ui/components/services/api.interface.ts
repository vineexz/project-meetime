export interface EventDetail {
  meetings: number;
  emails: number;
  calls: number;
  follows: number;
}

export interface DayEvent {
  day: number;
  events: EventDetail;
}

export interface CycleStructure extends EventDetail {
  day: number;
}

export interface Cycle {
  name: string;
  availableEntities: number;
  priority: 'LOW' | 'MEDIUM' | 'HIGH';
  structure: CycleStructure[];
}

export interface EventsProjection {
  eventsProjection: DayEvent[];
  cycles: Cycle[];
}
