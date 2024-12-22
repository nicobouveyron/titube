import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  OnDestroy,
  inject,
  computed,
  AfterViewInit,
  signal,
} from '@angular/core';
import { Alignment, Fit, Layout, Rive } from '@rive-app/canvas';
import { CardComponent } from './components/card/card.component';
import { Card, GameStore } from '../store/game.store';
import { ParticipantsStore } from '../store/participants.store';
import { NgClass } from '@angular/common';
import { CardVersoComponent } from './components/card-verso/card-verso.component';
import { DeckService } from '../services/game/deck.service';

@Component({
  selector: 'app-game',
  imports: [CardComponent, CardVersoComponent, NgClass],
  template: `
    <div class="flex flex-col justify-center items-center h-full">
      @if (card) { @if (game().player) {
      <h2 class="text-4xl font-bold">
        Au tour de
        <span class="text-[#FA7B53] font-bold">{{ game().player }}</span>
      </h2>
      }
      <div
        class="relative w-[80%] h-full perspective"
        (click)="isVerso.set(!isVerso())"
      >
        <div
          class="relative w-full h-full duration-700 preserve-3d"
          [ngClass]="{ 'rotate-y-180': isVerso() }"
        >
          <!-- Face avant -->
          <div
            [ngClass]="{ 'opacity-0': isVerso() }"
            class="absolute w-full h-full backface-hidden duration-300"
          >
            <app-card [card]="card" class="block w-full h-full">
              @if (!game().isRive) {
              <img
                class="absolute top-0 bottom-0 left-0 right-0 m-auto"
                src="titetes/{{ card.rive }}"
              />
              }
              <canvas
                id="riveCanvas"
                #riveCanvas
                [ngClass]="{ invisible: !game().isRive }"
              ></canvas>
            </app-card>
          </div>

          <!-- Face arrière -->
          <div class="absolute w-full h-full backface-hidden rotate-y-180">
            <!-- Contenu de votre verso ici -->
            <app-card-verso
              [card]="card"
              class="block w-full h-full"
            ></app-card-verso>
          </div>
        </div>
      </div>

      <button
        (click)="changeAnimation()"
        class="rounded-lg py-2 px-4 h-[70pt] bg-orange-500 w-[80%] text-white text-3xl my-5"
        routerLink="/lobby"
      >
        Au suivant
      </button>
      }@else {
      <h2 class="text-4xl font-bold">La partie est finie</h2>
      <button
        (click)="changeAnimation()"
        class="rounded-lg py-2 px-4 h-[70pt] bg-orange-500 w-[80%] text-white text-3xl my-5"
      >
        Relancer une partie
      </button>
      }
    </div>
  `,

  styles: [
    `
      canvas {
        width: 100%;
        height: 100%;
      }
      .perspective {
        perspective: 1000px;
      }
      .preserve-3d {
        transform-style: preserve-3d;
      }
      .backface-hidden {
        backface-visibility: hidden;
        justify-content: center;
        display: flex;
      }
      .rotate-y-180 {
        transform: rotateY(180deg);
      }
    `,
  ],
  standalone: true,
})
export class GameComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('riveCanvas') canvas!: ElementRef<HTMLCanvasElement>;

  readonly #store = inject(GameStore);
  readonly #storeParticipants = inject(ParticipantsStore);
  readonly #deckService = inject(DeckService);

  card: Card | null = this.#store.card();
  isVerso = signal(false);

  game = computed(() => {
    this.card = this.#store.card();

    if (this.card) {
      this.loadRiveAnimation(this.card.rive);
    }

    return {
      out: this.#store.cardsOut(),
      deck: this.#store.cards(),
      player: this.#store.currentPlayer(),
      card: this.#store.card(),
      isRive: !this.card?.rive.endsWith('.png'),
    };
  });

  // URL d'un fichier Rive public pour l'exemple
  // private riveUrl = 'https://cdn.rive.app/animations/vehicles.riv';
  private riveUrl = 'le_titube.riv';

  ngOnInit() {
    // Ajout du listener pour le redimensionnement
    window.addEventListener('resize', this.onResize.bind(this));
  }

  ngAfterViewInit(): void {
    // On attend que la vue soit initialisée
    this.initRenderer();
    this.loadRiveAnimation();
  }

  ngOnDestroy() {
    // Nettoyage du listener lors de la destruction du composant
    window.removeEventListener('resize', this.onResize.bind(this));
  }

  riveInstance: Rive | null = null;
  initRenderer() {
    if (this.canvas) {
      try {
        const canvas = this.canvas.nativeElement;

        // Définir les dimensions du canvas
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;

        const layout = new Layout({
          fit: Fit.Contain,
          alignment: Alignment.Center,
        });
        // Initialisation de Rive avec le canvas
        this.riveInstance = new Rive({
          canvas: canvas,
          src: this.riveUrl,
          autoplay: true,
          artboard: 'lesTitous',
          layout: layout,

          onLoad: () => {},
        });
      } catch (error) {
        console.error("Erreur lors du chargement de l'animation Rive:", error);
      }
    }
  }

  async loadRiveAnimation(animation?: string) {
    if (!this.riveInstance) {
      return;
    }

    this.riveInstance.play(animation);
    this.riveInstance.resizeToCanvas();
    this.riveInstance.resizeDrawingSurfaceToCanvas(5);
  }

  onResize() {
    this.riveInstance?.stop();
    if (this.canvas && this.riveInstance) {
      // Mise à jour des dimensions du canvas
      const canvas = this.canvas.nativeElement;
      const container = canvas.parentElement;
      if (container) {
        canvas.width = container.clientWidth;
        canvas.height = container.clientHeight;
        this.loadRiveAnimation();
      }
    }
  }

  changeAnimation() {
    if (this.#store.cards().length === 0) {
      this.#store.reset();
    }

    this.isVerso.set(false);
    const cardIndex = this.#deckService.getNextCardIndex();

    // Gestion de la rotation des joueurs
    const participants = this.#storeParticipants.usernames();
    const currentPlayer = this.#store.currentPlayer();

    let nextPlayerIndex = 0;
    if (currentPlayer) {
      const currentIndex = participants.indexOf(currentPlayer);
      nextPlayerIndex = (currentIndex + 1) % participants.length;
    }

    // * Dispatch events
    this.#store.addCarteOut(this.#store.cards()[cardIndex]);
    this.#store.setCurrentPlayer(participants[nextPlayerIndex]);

    if (this.riveInstance && this.game().isRive) {
      console.log({
        riveCard: this.card?.rive,
        riveInstance: this.riveInstance.contents,
      });
    }
  }
}
