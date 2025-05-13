import { CommonModule } from '@angular/common';
import { Component, Input, signal } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MeetimeInputComponent } from '../../../core/input-meetime/input-meetime.component';

@Component({
  selector: 'ui-entities',
  imports: [CommonModule, MatIconModule, MeetimeInputComponent],
  templateUrl: './entities.component.html',
  styleUrl: './entities.component.scss',
  standalone: true,
})
export class EntitiesComponent {
  @Input() titleEntities: string = 'Adicione um titulo';
  @Input() subtitleEntities: string = 'Adicione um texto ao subtitulo';
  @Input() iconInputEntities: string = 'play_arrow';
  @Input() labelInputRight: string = 'label';
  @Input() labelEvents: string = 'Novos eventos para hoje';
  @Input() setNumberEvents = signal<number>(0);
  @Input() control: FormControl = new FormControl<number>(1);
}
