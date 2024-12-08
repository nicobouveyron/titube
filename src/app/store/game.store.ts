import {
  patchState,
  signalStore,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
import { DECK } from '../services/game/deck.service';

export interface Card {
  value: string;
  rive: string;
  title: string;
  rules: string[];
  theme?: number;
}
type GameState = {
  cards: Card[];
  cardsOut: Card[];
  card: Card | null;
  isPlaying: boolean;
  currentPlayer: string;
};

const STORAGE_KEY = 'game-store';

export const initialState: GameState = {
  cards: DECK,
  cardsOut: [],
  card: null,
  isPlaying: false,
  currentPlayer: '',
};

// Helper function to save state
const saveState = (state: GameState) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
};

export const GameStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods((store) => ({
    // Ajout aux cartes piochées
    addCarteOut(carte: Card) {
      patchState(store, (state) => {
        const newCards = state.cards.filter((card) => card !== carte);
        const newState = {
          cards: newCards,
          cardsOut: [...state.cardsOut, carte],
          card: carte,
        };

        // Si le deck est vide, on reset
        if (newCards.length === 0) {
          const resetState = {
            cards: DECK,
            cardsOut: [],
            card: null,
            isPlaying: false,
            currentPlayer: '',
          };
          saveState(resetState);
          return resetState;
        }

        saveState({ ...state, ...newState });
        return newState;
      });
    },

    // Reset explicite du store
    reset() {
      const resetState = {
        cards: DECK,
        cardsOut: [],
        card: null,
        isPlaying: false,
        currentPlayer: '',
      };
      patchState(store, resetState);
      saveState(resetState);
    },

    // Définir le joueur actuel
    setCurrentPlayer(player: string) {
      patchState(store, (state) => {
        const newState = {
          ...state,
          currentPlayer: player,
        };
        saveState(newState);
        return newState;
      });
    },
  })),
  withHooks({
    onInit: (store) => {
      // Charger l'état depuis le localStorage
      const savedState = localStorage.getItem(STORAGE_KEY);
      if (savedState) {
        try {
          const state = JSON.parse(savedState);
          patchState(store, state);
        } catch (error) {
          console.error('Erreur lors du chargement du state:', error);
          // En cas d'erreur, on réinitialise le state
          localStorage.removeItem(STORAGE_KEY);
        }
      }
    },
  })
);
