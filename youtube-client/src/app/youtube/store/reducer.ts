import { Action, createReducer, on } from '@ngrx/store';

import { UserCard } from '../models/user-card';
import * as CardsActions from './actions';
import { CardState, initialCardsState } from './state';

const CUSTOM_ID = 'custom'

const reducer = createReducer(initialCardsState,
  on(CardsActions.getCards, state => {
    return { ...state }
  }),

  on(CardsActions.updateState, (state, {cards}) => {
    state.cards.filter(card => {
      return card.id.split('-')[0] === CUSTOM_ID;
    });

    const newState = { ...state, cards: [...state.cards, ...cards] };
    return newState;
  }),

  on(CardsActions.createCard, (state, {card}) => {
    const id = Date.now();
    const publishedAt = new Date(id).toString();

    const newCard: UserCard = {
      id: `${CUSTOM_ID}-${id.toString()}`,
      title: card.title,
      publishedAt: publishedAt,
      imageUrl: card.imageUrl,
      viewCount: '0',
      likeCount: '0',
      dislikeCount: '0',
      commentCount: '0',
    };

    const newState = { ...state, cards: [...state.cards, newCard] };
    return newState;
  }),
);

export function cardsReducer(state: CardState, action: Action) {
  return reducer(state, action);
};
