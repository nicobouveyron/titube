import { inject, Injectable } from '@angular/core';
import { Card, GameStore } from '../../store/game.store';

@Injectable({
  providedIn: 'root',
})
export class DeckService {
  readonly #store = inject(GameStore);

  constructor() {}

  getNextCardIndex(): number {
    return Math.floor(Math.random() * this.#store.cards().length);
  }
  /**
   * Extrait les valeurs uniques des cartes et les trie
   * @param deck Tableau de cartes
   * @returns Tableau de valeurs uniques triées
   */
  getUniqueCardValues(deck: Card[]): string[] {
    // Utilise Set pour obtenir des valeurs uniques
    const uniqueValues = new Set(deck.map((card) => card.value));

    // Convertit le Set en tableau et trie les valeurs
    const sortedValues = Array.from(uniqueValues).sort((a, b) => {
      // Ordre personnalisé : A, nombres, V, D, R
      const order: { [key: string]: number } = {
        A: 1,
        V: 11,
        D: 12,
        R: 13,
      };

      // Si les deux valeurs sont des nombres
      if (!isNaN(Number(a)) && !isNaN(Number(b))) {
        return Number(a) - Number(b);
      }

      // Si une des valeurs est spéciale, utilise l'ordre personnalisé
      const orderA = order[a] || Number(a);
      const orderB = order[b] || Number(b);

      return orderA - orderB;
    });

    return sortedValues;
  }

  /**
   * Filtre les cartes du deck par valeur
   * @param value Valeur de la carte à filtrer
   * @param deck Tableau de toutes les cartes
   * @returns Tableau des cartes filtrées
   */
  filterCardsByValue(value: string | null, deck: Card[]): Card[] {
    // Si aucune valeur n'est sélectionnée, retourne tout le deck
    if (!value) {
      return deck;
    }

    // Filtre les cartes qui correspondent à la valeur
    return deck.filter((card) => card.value === value);
  }
}

export const DECK: Card[] = [
  {
    value: 'A',
    rive: '1-Titou-Pinces',
    title: 'Shi-fu-shot',
    rules: ["Shi-fu-mi avec quelqu'un, le perdant boit"],
    theme: 0,
  },
  {
    value: '2',
    rive: '2b-titete.png',
    title: 'Titou ordonne',
    rules: ['Donne 2 gorgées'],
    theme: 0,
  },
  {
    value: '3',
    rive: '3b-titete.png',
    title: 'Titou ramasse',
    rules: ['Bois 3 gorgées'],
    theme: 0,
  },
  {
    value: '4',
    rive: '4b-titete.png',
    title: 'Titou partage',
    rules: ['Donne 2 gorgées et bois 2 gorgées'],
    theme: 0,
  },
  {
    value: '5',
    rive: '5b-titete.png',
    title: 'Partez devant',
    rules: [
      'Ceux qui ont leur verre moins rempli que celui qui pioche la carte boivent',
    ],
    theme: 0,
  },
  {
    value: '6',
    rive: '6b-titete.png',
    title: 'Voiture-balai',
    rules: [
      'Ceux qui ont leur verre plus rempli que celui qui pioche la carte boivent',
    ],
    theme: 0,
  },
  {
    value: '7',
    rive: '7b-titete.png',
    title: 'Pouvoir : Roi du pouce',
    rules: [
      'Tu deviens le roi du pouce, le dernier à mettre le pouce sur son front a perdu et boit',
    ],
    theme: 0,
  },
  {
    value: '8',
    rive: '8b-titete.png',
    title: 'Copain de boisson',
    rules: ["Lie-toi à quelqu'un, quand l'un boit, l'autre boit avec lui"],
    theme: 0,
  },
  {
    value: '9',
    rive: '9b-titete.png',
    title: 'Mini-jeu : Les rimes',
    rules: [
      'Tu donne un mot, tout le monde doit trouver un mot qui rime, le premier qui perd boit',
    ],
    theme: 0,
  },
  {
    value: '10',
    rive: '10b-titete.png',
    title: "Tit'tournée",
    rules: ['Tout le monde bois'],
    theme: 0,
  },
  {
    value: 'V',
    rive: '4-Titou-Carton',
    title: 'Alcooliques anonymes',
    rules: ['Plus le droit de dire nom prénom'],
    theme: 0,
  },
  {
    value: 'D',
    rive: '12-Titou-Chaise',
    title: 'Titou voit double',
    rules: [
      'Mini-jeu : Les thèmes',
      "La reine des putes : si tu pose une question et qu'on te répond, il/elle boit, si on te dit tais-toi/ ta geule, tu bois",
    ],
    theme: 0,
  },
  {
    value: 'R',
    rive: '5-Titou-Ronflex',
    title: 'Roi du regard',
    rules: ["Si quelqu'un te regarde, il/elle boit"],
    theme: 0,
  },
  {
    value: 'A',
    rive: '15-Titou-Caillou',
    title: 'Shi-fu-shot',
    rules: ["Shi-fu-mi avec quelqu'un, le perdant boit"],
    theme: 1,
  },
  {
    value: '2',
    rive: '2y-titete.png',
    title: 'Titou ordonne',
    rules: ['Donne 2 gorgées'],
    theme: 1,
  },
  {
    value: '3',
    rive: '3y-titete.png',
    title: 'Titou ramasse',
    rules: ['Bois 3 gorgées'],
    theme: 1,
  },
  {
    value: '4',
    rive: '4y-titete.png',
    title: 'Titou partage',
    rules: ['Donne 2 gorgées et bois 2 gorgées'],
    theme: 1,
  },
  {
    value: '5',
    rive: '5y-titete.png',
    title: 'Partez devant',
    rules: [
      'Ceux qui ont leur verre moins rempli que celui qui pioche la carte boivent',
    ],
    theme: 1,
  },
  {
    value: '6',
    rive: '6y-titete.png',
    title: 'Voiture-balai',
    rules: [
      'Ceux qui ont leur verre plus rempli que celui qui pioche la carte boivent',
    ],
    theme: 1,
  },
  {
    value: '7',
    rive: '7y-titete.png',
    title: 'Pouvoir : Roi du pouce',
    rules: [
      'Tu deviens le roi du pouce, le dernier à mettre le pouce sur son front a perdu et boit',
    ],
    theme: 1,
  },
  {
    value: '8',
    rive: '8y-titete.png',
    title: 'Copain de boisson',
    rules: ["Lie-toi à quelqu'un, quand l'un boit, l'autre boit avec lui"],
    theme: 1,
  },
  {
    value: '9',
    rive: '9y-titete.png',
    title: 'Mini-jeu : Les rimes',
    rules: [
      'Tu donne un mot, tout le monde doit trouver un mot qui rime, le premier qui perd boit',
    ],
    theme: 1,
  },
  {
    value: '10',
    rive: '10y-titete.png',
    title: "Tit'tournée",
    rules: ['Tout le monde bois'],
    theme: 1,
  },
  {
    value: 'V',
    rive: '9-Titou-Viking',
    title: 'Ni oui ni non',
    rules: ['Plus le droit de dire oui et non'],
    theme: 1,
  },
  {
    value: 'D',
    rive: '14-Titou-Pyromane',
    title: 'Titou voit double',
    rules: [
      'Mini-jeu : Les thèmes',
      "La reine des putes : si tu pose une question et qu'on te répond, il/elle boit, si on te dit tais-toi/ ta geule, tu bois",
    ],
    theme: 1,
  },
  {
    value: 'R',
    rive: '7-Titou-Kebab_tourne',
    title: 'Roi du regard',
    rules: ["Si quelqu'un te regarde, il/elle boit"],
    theme: 1,
  },
  {
    value: 'A',
    rive: '6-Titou-Tonneau',
    title: 'Shi-fu-shot',
    rules: ["Shi-fu-mi avec quelqu'un, le perdant boit"],
    theme: 2,
  },
  {
    value: '2',
    rive: '2g-titete.png',
    title: 'Titou ordonne',
    rules: ['Donne 2 gorgées'],
    theme: 2,
  },
  {
    value: '3',
    rive: '3g-titete.png',
    title: 'Titou ramasse',
    rules: ['Bois 3 gorgées'],
    theme: 2,
  },
  {
    value: '4',
    rive: '4g-titete.png',
    title: 'Titou partage',
    rules: ['Donne 2 gorgées et bois 2 gorgées'],
    theme: 2,
  },
  {
    value: '5',
    rive: '5g-titete.png',
    title: 'Partez devant',
    rules: [
      'Ceux qui ont leur verre moins rempli que celui qui pioche la carte boivent',
    ],
    theme: 2,
  },
  {
    value: '6',
    rive: '6g-titete.png',
    title: 'Voiture-balai',
    rules: [
      'Ceux qui ont leur verre plus rempli que celui qui pioche la carte boivent',
    ],
    theme: 2,
  },
  {
    value: '7',
    rive: '7g-titete.png',
    title: 'Pouvoir : Roi du pouce',
    rules: [
      'Tu deviens le roi du pouce, le dernier à mettre le pouce sur son front a perdu et boit',
    ],
    theme: 2,
  },
  {
    value: '8',
    rive: '8g-titete.png',
    title: 'Copain de boisson',
    rules: ["Lie-toi à quelqu'un, quand l'un boit, l'autre boit avec lui"],
    theme: 2,
  },
  {
    value: '9',
    rive: '9g-titete.png',
    title: 'Mini-jeu : Les rimes',
    rules: [
      'Tu donne un mot, tout le monde doit trouver un mot qui rime, le premier qui perd boit',
    ],
    theme: 2,
  },
  {
    value: '10',
    rive: '10g-titete.png',
    title: "Tit'tournée",
    rules: ['Tout le monde bois'],
    theme: 2,
  },
  {
    value: 'V',
    rive: '2-Titou-Shrek',
    title: 'Restons fleuris',
    rules: ['Plus le droit à toute sorte de politesse'],
    theme: 2,
  },
  {
    value: 'D',
    rive: '16-Titou-Patrick',
    title: 'Titou voit double',
    rules: [
      'Mini-jeu : Les thèmes',
      "La reine des putes : si tu pose une question et qu'on te répond, il/elle boit, si on te dit tais-toi/ ta geule, tu bois",
    ],
    theme: 2,
  },
  {
    value: 'R',
    rive: '11-Titou-Clown',
    title: 'Roi du regard',
    rules: ["Si quelqu'un te regarde, il/elle boit"],
    theme: 2,
  },
  {
    value: 'A',
    rive: '8-Titou-PomPomGirl',
    title: 'Shi-fu-shot',
    rules: ["Shi-fu-mi avec quelqu'un, le perdant boit"],
    theme: 3,
  },
  {
    value: '2',
    rive: '2p-titete.png',
    title: 'Titou ordonne',
    rules: ['Donne 2 gorgées'],
    theme: 3,
  },
  {
    value: '3',
    rive: '3p-titete.png',
    title: 'Titou ramasse',
    rules: ['Bois 3 gorgées'],
    theme: 3,
  },
  {
    value: '4',
    rive: '4p-titete.png',
    title: 'Titou partage',
    rules: ['Donne 2 gorgées et bois 2 gorgées'],
    theme: 3,
  },
  {
    value: '5',
    rive: '5p-titete.png',
    title: 'Partez devant',
    rules: [
      'Ceux qui ont leur verre moins rempli que celui qui pioche la carte boivent',
    ],
    theme: 3,
  },
  {
    value: '6',
    rive: '6p-titete.png',
    title: 'Voiture-balai',
    rules: [
      'Ceux qui ont leur verre plus rempli que celui qui pioche la carte boivent',
    ],
    theme: 3,
  },
  {
    value: '7',
    rive: '7p-titete.png',
    title: 'Pouvoir : Roi du pouce',
    rules: [
      'Tu deviens le roi du pouce, le dernier à mettre le pouce sur son front a perdu et boit',
    ],
    theme: 3,
  },
  {
    value: '8',
    rive: '8p-titete.png',
    title: 'Copain de boisson',
    rules: ["Lie-toi à quelqu'un, quand l'un boit, l'autre boit avec lui"],
    theme: 3,
  },
  {
    value: '9',
    rive: '9p-titete.png',
    title: 'Mini-jeu : Les rimes',
    rules: [
      'Tu donne un mot, tout le monde doit trouver un mot qui rime, le premier qui perd boit',
    ],
    theme: 3,
  },
  {
    value: '10',
    rive: '10p-titete.png',
    title: "Tit'tournée",
    rules: ['Tout le monde bois'],
    theme: 3,
  },
  {
    value: 'V',
    rive: '13-Titou-Alchimiste',
    title: 'Chercheur mixologue',
    rules: ['Invente une nouvelle règle'],
    theme: 3,
  },
  {
    value: 'D',
    rive: '3-Titou-Festoch',
    title: 'Titou voit double',
    rules: [
      'Mini-jeu : Les thèmes',
      "La reine des putes : si tu pose une question et qu'on te répond, il/elle boit, si on te dit tais-toi/ ta geule, tu bois",
    ],
    theme: 3,
  },
  {
    value: 'R',
    rive: '10-Titou-Gamer',
    title: 'Roi du regard',
    rules: ["Si quelqu'un te regarde, il/elle boit"],
    theme: 3,
  },
];
