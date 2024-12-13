import { Component, inject, signal } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Router, RouterLink } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';
import { AutoAnimateDirective } from '../shared/directives/auto-animate.directive';
import { ParticipantsStore } from '../store/participants.store';
import { AddListItemComponent } from './components/add-list-item/add-list-item.component';
import { ListItemComponent } from './components/list-item/list-item.component';
import { LoaderService } from '../services/loader.service';
import { GameStore } from '../store/game.store';
import { DeckService } from '../services/game/deck.service';

@Component({
  selector: 'app-lobby',
  standalone: true,
  imports: [
    ListItemComponent,
    AutoAnimateDirective,
    AddListItemComponent,
    LucideAngularModule,
    MatTooltipModule,
  ],
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.scss'],
})
export class LobbyComponent {
  readonly #router = inject(Router);
  readonly #loaderService = inject(LoaderService);
  readonly #deckService = inject(DeckService);

  readonly store = inject(ParticipantsStore);
  readonly gameStore = inject(GameStore);
  readonly dialog = inject(MatDialog);

  username = '';
  clear = signal(true);

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
    if (this.username) {
      this.store.addParticipant(this.username);
    }
  }

  startGame() {
    this.#loaderService.show();
    setTimeout(() => {
      this.gameStore.reset();
      this.gameStore.setCurrentPlayer(this.store.usernames()[0]);
      this.gameStore.addCarteOut(
        this.gameStore.cards()[this.#deckService.getNextCardIndex()]
      );
      this.#loaderService.hide();
      this.#router.navigate(['game']);
    }, 32500);
  }
}
