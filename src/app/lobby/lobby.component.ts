import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Router } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';
import { DeckService } from '../services/game/deck.service';
import { LoaderService } from '../services/loader.service';
import { GameStore } from '../store/game.store';
import { ParticipantsStore } from '../store/participants.store';
import { ListParticipantsComponent } from './components/list-participants/list-participants.component';

@Component({
  selector: 'app-lobby',
  standalone: true,
  imports: [
    LucideAngularModule,
    MatTooltipModule,
    MatButtonModule,
    ListParticipantsComponent,
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
    }, 3000);
  }
}
