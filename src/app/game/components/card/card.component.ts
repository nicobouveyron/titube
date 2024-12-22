// power-card.component.ts
import { Component, computed, input, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Card } from '../../../store/game.store';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      class="w-full h-full bg-white rounded-3xl relative overflow-hidden p-4 shadow-lg border-4"
      [class]="borders[card().theme || 0]"
    >
      <!-- Lettre en haut à gauche -->
      <div
        class="absolute top-4 left-4 w-16 h-16 rounded-lg flex items-center justify-center z-20"
        [class]="backgrounds[card().theme || 0]"
      >
        <span class="text-white text-4xl font-bold">{{ card().value }}</span>
      </div>

      <!-- Grande lettre en arrière-plan -->
      <div
        class="absolute right-4 top-5  text-9xl font-bold opacity-20 z-20"
        [class]="texts[card().theme || 0]"
      >
        {{ card().value }}
      </div>

      <!-- Zone de contenu principal - espace réservé pour l'image -->
      <div class="w-full h-3/5 mt-20  relative z-20">
        <ng-content></ng-content>
      </div>

      <!-- Texte du bas -->
      <div class="absolute bottom-[20px] z-20 w-full left-0">
        <h2
          class=" text-3xl text-center font-bold leading-tight"
          [class]="texts[card().theme || 0]"
        >
          {{ card().title }}
        </h2>
        <!-- <ul>
          @for (rule of rules(); track rule.index) {
          <li class="text-center text-xl leading-tight">
            {{ rule.rule }}
          </li>
          }
        </ul> -->
      </div>

      <div
        class="absolute bottom-0 left-0 h-[25vw] w-[25vw] min-w-[300pt] min-h-[300pt] max-h-[500px] max-w-[500px] rounded-full  -translate-x-[15%] translate-y-[15%] opacity-20 z-10"
        [class]="backgrounds[card().theme || 0]"
      ></div>
    </div>
  `,
  styleUrls: ['./card.component.scss'],
})
export class CardComponent {
  @Input() letter: string = 'R';
  @Input() title: string = 'Pouvoir : Roi du regard';

  card = input.required<Card>();

  rules = computed(() => {
    return this.card().rules.map((rule, i) => {
      return {
        index: i,
        rule: rule,
      };
    }); // Utilisez le signal card ici
  });
  backgrounds = [
    'bg-[#73B4BD]',
    'bg-[#E6BF25]',
    'bg-[#A8C521]',
    'bg-[#996AC1]',
  ];
  texts = [
    'text-[#73B4BD]',
    'text-[#E6BF25]',
    'text-[#A8C521]',
    'text-[#996AC1]',
  ];
  borders = [
    'border-[#73B4BD]',
    'border-[#E6BF25]',
    'border-[#A8C521]',
    'border-[#996AC1]',
  ];
}
