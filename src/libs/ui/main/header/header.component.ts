import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'ui-header',
  imports: [CommonModule, MatIconModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  standalone: true,
})
export class HeaderComponent {
  @Input() labelHeader: string = 'empty';
  @Input() iconNameHeader: string = 'empty';
  @Input() configclass: string = 'flex';
}
