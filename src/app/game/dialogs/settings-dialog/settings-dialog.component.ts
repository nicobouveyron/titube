import { Component, inject } from '@angular/core';
import { ParticipantsStore } from '../../../store/participants.store';
import { GameStore } from '../../../store/game.store';
import { DeckService } from '../../../services/game/deck.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { LoaderService } from '../../../services/loader.service';
import { Router } from '@angular/router';
import { RulesViewComponent } from '../../../rules/rules-view/rules-view.component';
import { firstValueFrom } from 'rxjs';
import { LobbyComponent } from '../../../lobby/lobby.component';
import { ListParticipantsComponent } from '../../../lobby/components/list-participants/list-participants.component';
import {
  ConfirmationComponent,
  ConfirmationDialogService,
} from '../../../shared/dialogs/confirmation/confirmation.component';

@Component({
  selector: 'app-settings-dialog',
  standalone: true,
  imports: [],
  templateUrl: './settings-dialog.component.html',
  styleUrl: './settings-dialog.component.scss',
})
export class SettingsDialogComponent {
  readonly router = inject(Router);
  readonly participantsStore = inject(ParticipantsStore);
  readonly gameStore = inject(GameStore);

  readonly deckService = inject(DeckService);
  readonly loaderService = inject(LoaderService);
  readonly confirmationService = inject(ConfirmationDialogService);

  readonly dialogRef = inject(MatDialogRef<SettingsDialogComponent>);
  readonly dialog = inject(MatDialog);

  onResumeGame() {
    this.dialogRef.close();
  }

  onRestartGame() {
    this.loaderService.show();

    setTimeout(() => {
      this.loaderService.hide();
      this.gameStore.reset();
      this.gameStore.addCarteOut(
        this.gameStore.cards()[this.deckService.getNextCardIndex()]
      );
      this.gameStore.setCurrentPlayer(this.participantsStore.usernames()[0]);
      this.dialogRef.close();
    }, 2000);
  }

  async onLeaveGame() {
    const result = await firstValueFrom(
      this.confirmationService.confirm({
        title: 'Quitter la partie',
        message: 'Etes-vous sur de vouloir quitter la partie ?',
      })
    );

    if (result) {
      this.loaderService.show();
      this.router.navigate(['lobby']);
      this.gameStore.reset();
      this.loaderService.hide();
      this.dialogRef.close();
    }
  }

  async onShowCardsList() {
    firstValueFrom(
      this.dialog
        .open(RulesViewComponent, {
          width: '100svw',
          maxWidth: '100svw',
        })
        .afterClosed()
    );
  }
  async onShowPlayersList() {
    firstValueFrom(
      this.dialog
        .open(ListParticipantsComponent, {
          width: '100svw',
          maxWidth: '100svw',
        })
        .afterClosed()
    );
  }
}
