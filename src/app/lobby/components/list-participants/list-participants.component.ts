import { Component, inject } from '@angular/core';
import { AddListItemComponent } from '../add-list-item/add-list-item.component';
import { ListItemComponent } from '../list-item/list-item.component';
import { ParticipantsStore } from '../../../store/participants.store';
import { AutoAnimateDirective } from '../../../shared/directives/auto-animate.directive';

@Component({
  selector: 'app-list-participants',
  standalone: true,
  imports: [AddListItemComponent, ListItemComponent, AutoAnimateDirective],
  templateUrl: './list-participants.component.html',
  styleUrl: './list-participants.component.scss',
})
export class ListParticipantsComponent {
  readonly store = inject(ParticipantsStore);
  username = '';
}
