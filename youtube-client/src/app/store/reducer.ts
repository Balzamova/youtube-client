import { cardsReducer } from '@app/youtube/store/reducer';

import { Action } from './action';
import { AppState } from './state';

export function AppReducer (state: AppState, action: Action) {
  return {
    cards: cardsReducer(state.cardState, action)
  }
}
