import { signalStore, withState, withMethods, withHooks } from '@ngrx/signals';
import { patchState } from '@ngrx/signals';

type ParticipantsState = {
  usernames: string[];
  isLoading: boolean;
};

const STORAGE_KEY = 'participants-store';

export const initialState: ParticipantsState = {
  usernames: [],
  isLoading: false,
};

// Helper function to save state
const saveState = (state: ParticipantsState) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
};

export const ParticipantsStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods((store) => ({
    addParticipant(username: string) {
      patchState(store, (state) => {
        const newState = {
          usernames: [...state.usernames, username],
        };
        saveState({ ...state, ...newState });
        return newState;
      });
    },
    removeParticipant(username: string) {
      patchState(store, (state) => {
        const newState = {
          usernames: state.usernames.filter((name) => name !== username),
        };
        saveState({ ...state, ...newState });
        return newState;
      });
    },
  })),
  withHooks({
    onInit: (store) => {
      // Load state from localStorage on init
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        patchState(store, JSON.parse(saved));
      }
    }
  })
);
