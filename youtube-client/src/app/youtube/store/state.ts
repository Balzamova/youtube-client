import { UserCard } from '../models/user-card';

export interface CardState {
  cards: UserCard[];
}

export const initialCardsState: CardState = {
  cards: [],
}
