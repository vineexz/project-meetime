import { Injectable, signal } from '@angular/core';
import { EventsProjection } from './api.interface';

@Injectable({ providedIn: 'root' })
export class ApiService {
  get getApi() {
    return this.eventsProjection();
  }

  private readonly eventsProjection = signal<EventsProjection>({
    eventsProjection: [
      {
        day: 1,
        events: {
          meetings: 32,
          emails: 10,
          calls: 3,
          follows: 5,
        },
      },
      {
        day: 2,
        events: {
          meetings: 55,
          emails: 6,
          calls: 3,
          follows: 5,
        },
      },
      {
        day: 3,
        events: {
          meetings: 97,
          emails: 8,
          calls: 0,
          follows: 2,
        },
      },
      {
        day: 4,
        events: {
          meetings: 24,
          emails: 0,
          calls: 15,
          follows: 1,
        },
      },
      {
        day: 5,
        events: {
          meetings: 18,
          emails: 12,
          calls: 5,
          follows: 0,
        },
      },
    ],
    cycles: [
      {
        name: 'Ciclo 1',
        availableEntities: 1,
        priority: 'HIGH',
        structure: [
          {
            day: 1,
            meetings: 15,
            emails: 10,
            calls: 3,
            follows: 5,
          },
          {
            day: 2,
            meetings: 54,
            emails: 15,
            calls: 10,
            follows: 6,
          },
          {
            day: 3,
            meetings: 5,
            emails: 6,
            calls: 12,
            follows: 1,
          },
          {
            day: 4,
            meetings: 14,
            emails: 13,
            calls: 1,
            follows: 0,
          },
          {
            day: 5,
            meetings: 4,
            emails: 3,
            calls: 8,
            follows: 9,
          },
        ],
      },
      {
        name: 'Ciclo 2',
        availableEntities: 7,
        priority: 'HIGH',
        structure: [
          {
            day: 1,
            meetings: 9,
            emails: 0,
            calls: 12,
            follows: 8,
          },
          {
            day: 2,
            meetings: 3,
            emails: 55,
            calls: 15,
            follows: 3,
          },
          {
            day: 3,
            meetings: 1,
            emails: 9,
            calls: 14,
            follows: 12,
          },
          {
            day: 4,
            meetings: 22,
            emails: 4,
            calls: 11,
            follows: 2,
          },
          {
            day: 5,
            meetings: 0,
            emails: 1,
            calls: 4,
            follows: 5,
          },
        ],
      },
      {
        name: 'Ciclo 3',
        availableEntities: 2,
        priority: 'MEDIUM',
        structure: [
          {
            day: 1,
            meetings: 3,
            emails: 4,
            calls: 0,
            follows: 2,
          },
          {
            day: 2,
            meetings: 1,
            emails: 1,
            calls: 1,
            follows: 1,
          },
          {
            day: 3,
            meetings: 0,
            emails: 0,
            calls: 0,
            follows: 0,
          },
          {
            day: 4,
            meetings: 7,
            emails: 34,
            calls: 12,
            follows: 1,
          },
          {
            day: 5,
            meetings: 5,
            emails: 7,
            calls: 9,
            follows: 12,
          },
        ],
      },
      {
        name: 'Ciclo 4',
        availableEntities: 5,
        priority: 'LOW',
        structure: [
          {
            day: 1,
            meetings: 12,
            emails: 12,
            calls: 4,
            follows: 45,
          },
          {
            day: 2,
            meetings: 6,
            emails: 43,
            calls: 12,
            follows: 1,
          },
          {
            day: 3,
            meetings: 1,
            emails: 1,
            calls: 1,
            follows: 5,
          },
          {
            day: 4,
            meetings: 44,
            emails: 33,
            calls: 22,
            follows: 2,
          },
          {
            day: 5,
            meetings: 5,
            emails: 15,
            calls: 12,
            follows: 11,
          },
        ],
      },
      {
        name: 'Ciclo 5',
        availableEntities: 6,
        priority: 'HIGH',
        structure: [
          {
            day: 1,
            meetings: 8,
            emails: 7,
            calls: 5,
            follows: 4,
          },
          {
            day: 2,
            meetings: 3,
            emails: 9,
            calls: 5,
            follows: 4,
          },
          {
            day: 3,
            meetings: 4,
            emails: 4,
            calls: 4,
            follows: 4,
          },
          {
            day: 4,
            meetings: 8,
            emails: 4,
            calls: 3,
            follows: 2,
          },
          {
            day: 5,
            meetings: 4,
            emails: 3,
            calls: 8,
            follows: 9,
          },
        ],
      },
    ],
  });
}
