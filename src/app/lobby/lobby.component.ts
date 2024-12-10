import { Component, inject } from '@angular/core';
import { ListItemComponent } from './components/list-item/list-item.component';
import { RouterLink } from '@angular/router';
import { ParticipantsStore } from '../store/participants.store';
import { MatDialog } from '@angular/material/dialog';
import { firstValueFrom } from 'rxjs';
import { AddUsernameComponent } from './components/dialogs/add-username/add-username.component';
import { AutoAnimateDirective } from '../shared/directives/auto-animate.directive';
import { AddListItemComponent } from './components/add-list-item/add-list-item.component';

@Component({
  selector: 'app-lobby',
  standalone: true,
  imports: [
    ListItemComponent,
    RouterLink,
    AutoAnimateDirective,
    AddListItemComponent,
  ],
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.scss'],
})
export class LobbyComponent {
  readonly store = inject(ParticipantsStore);
  readonly dialog = inject(MatDialog);

  username = '';

  participants = this.store.usernames;

  animationOptions = {
    duration: 300,
    easing: 'ease-in-out',
    animations: {
      enter: [
        { opacity: 0, transform: 'translateY(-20px)' },
        { opacity: 1, transform: 'translateY(0)' },
      ],
      leave: [
        { opacity: 1, transform: 'translateY(0)' },
        { opacity: 0, transform: 'translateY(20px)' },
      ],
    },
  };

  async addParticipant() {
    console.log(this.username);

    // const username = await firstValueFrom(
    //   this.dialog.open(AddUsernameComponent).afterClosed()
    // );

    if (this.username) {
      this.store.addParticipant(this.username);
    }
  }
}
