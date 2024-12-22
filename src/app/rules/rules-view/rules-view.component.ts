import {
  AfterViewInit,
  Component,
  computed,
  ElementRef,
  inject,
  OnDestroy,
  QueryList,
  signal,
  ViewChildren,
} from '@angular/core';
import { DECK, DeckService } from '../../services/game/deck.service';
import { CardComponent } from '../../game/components/card/card.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { NgClass, NgIf } from '@angular/common';
import { Card } from '../../store/game.store';
import { Alignment, Fit, Layout, Rive } from '@rive-app/canvas';

@Component({
  selector: 'app-rules-view',
  standalone: true,
  imports: [MatExpansionModule, NgClass, NgIf],
  templateUrl: './rules-view.component.html',
  styleUrl: './rules-view.component.scss',
})
export class RulesViewComponent implements AfterViewInit, OnDestroy {
  readonly deckService = inject(DeckService);
  deck = DECK;
  filter = this.deckService.getUniqueCardValues(this.deck);
  value = signal<string | null>(this.filter[0]);
  readonly panelOpenState = signal(false);
  private riveUrl = 'le_titube.riv';

  @ViewChildren('riveCanvas') riveCanvases!: QueryList<ElementRef>;
  private riveInstances: Map<number, Rive> = new Map();

  cards = computed(() => {
    return this.deckService.filterCardsByValue(this.value(), this.deck);
  });

  isRive(card: Card) {
    return !card.rive.endsWith('.png');
  }

  onClickValue(value: string) {
    this.value.set(value);
    this.initRiveAnimations();
  }

  private async initRiveAnimations() {
    // Nettoyer les anciennes instances
    this.riveInstances.forEach((instance) => instance.cleanup());
    this.riveInstances.clear();

    // Initialiser chaque canvas
    this.riveCanvases.forEach((canvasRef, index) => {
      const card = this.cards()[index];
      if (this.isRive(card)) {
        this.initializeRiveForCanvas(
          canvasRef.nativeElement,
          card.rive,
          index,
          card
        );
      }
    });
  }

  private async initializeRiveForCanvas(
    canvas: HTMLCanvasElement,
    riveFile: string,
    index: number,
    card: Card
  ) {
    try {
      const riveInstance = new Rive({
        canvas: canvas,
        src: this.riveUrl,
        autoplay: true,
        stateMachines: 'DEFAULT',
        layout: new Layout({
          fit: Fit.Contain,
          alignment: Alignment.Center,
        }),
        onLoad: () => {
          riveInstance.play(card.rive);
          riveInstance.resizeToCanvas();
          riveInstance.resizeDrawingSurfaceToCanvas();
        },
        onLoadError: (error) => {
          console.error('Rive file error:', error);
        },
      });

      this.riveInstances.set(index, riveInstance);
    } catch (error) {
      console.error(
        `Erreur lors de l'initialisation de Rive pour l'index ${index}:`,
        error
      );
    }
  }

  // Cleanup lors de la destruction du composant
  ngOnDestroy() {
    this.riveInstances.forEach((instance) => instance.cleanup());
  }

  ngAfterViewInit() {
    // Initial load
    this.initRiveAnimations();

    // Observer les changements de la liste des canvas
    this.riveCanvases.changes.subscribe(() => {
      this.initRiveAnimations();
    });
  }
}
