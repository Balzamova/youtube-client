import { CardState, initialCardsState } from '../youtube/store/state';

export interface AppState {
  cardState: CardState;
}

export const State: AppState = {
  cardState: initialCardsState,
}

