import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  OnDestroy,
  inject,
  computed,
  AfterViewInit,
} from '@angular/core';
import { Rive } from '@rive-app/canvas';
import { CardComponent } from './components/card/card.component';
import { Card, GameStore } from '../store/game.store';
import { ParticipantsStore } from '../store/participants.store';

@Component({
  selector: 'app-game',
  imports: [CardComponent],
  template: `
    <div class="flex flex-col justify-center items-center h-full">
      @if (card) { @if (game().player) {
      <h2 class="text-4xl font-bold">
        Au tour de
        <span class="text-[#FA7B53] font-bold">{{ game().player }}</span>
      </h2>
      }
      <app-card [card]="card" class="block w-[80%] h-full">
        <canvas id="riveCanvas" #riveCanvas></canvas>
        @if (!game().isRive) {
        <img
          class="absolute top-0 bottom-0 left-0 right-0 m-auto"
          src="titetes/{{ card.rive }}"
        />

        }
      </app-card>

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
    `,
  ],
  standalone: true,
})
export class GameComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('riveCanvas') canvas!: ElementRef<HTMLCanvasElement>;
  readonly #store = inject(GameStore);
  readonly #storeParticipants = inject(ParticipantsStore);
  card: Card | null = this.#store.card();

  game = computed(() => {
    this.card = this.#store.card();
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
  private riveUrl = '/le_titube.riv';

  ngOnInit() {
    // Ajout du listener pour le redimensionnement
    window.addEventListener('resize', this.onResize.bind(this));
  }

  ngAfterViewInit(): void {
    // On attend que la vue soit initialisée
    setTimeout(() => {
      this.loadRiveAnimation();
    });
  }

  ngOnDestroy() {
    // Nettoyage du listener lors de la destruction du composant
    window.removeEventListener('resize', this.onResize.bind(this));
  }

  riveInstance: Rive | null = null;
  async loadRiveAnimation() {
    if (this.canvas) {
      try {
        // Initialisation de Rive avec le canvas
        this.riveInstance = new Rive({
          canvas: this.canvas.nativeElement,
          src: this.riveUrl,
          autoplay: true,
          artboard: 'lesTitous',
        });
        this.riveInstance.resizeToCanvas();
        this.riveInstance.resizeDrawingSurfaceToCanvas();
        console.log(this.riveInstance);
      } catch (error) {
        console.error("Erreur lors du chargement de l'animation Rive:", error);
      }
    }
  }

  onResize() {
    if (this.canvas && this.riveInstance) {
      // Mise à jour des dimensions du canvas
      const canvas = this.canvas.nativeElement;
      const container = canvas.parentElement;
      if (container) {
        canvas.width = container.clientWidth;
        canvas.height = container.clientHeight;
        this.riveInstance.resizeToCanvas();
      }
    }
  }

  changeAnimation() {
    const cardIndex = Math.floor(Math.random() * this.#store.cards().length);

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
      const animations = this.riveInstance!.animationNames;
      const randomIndex = Math.floor(Math.random() * animations.length);

      console.log(this.card?.rive);
      this.riveInstance!.play(this.card?.rive);
    }

    console.log(this.game());
  }
}
