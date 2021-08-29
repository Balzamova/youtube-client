import { createAction, props } from '@ngrx/store';

import { AdminCard } from '../models/admin-new-card';
import { UserCard } from '../models/user-card';

export const getCards = createAction(
  'GET_CARDS'
);

export const createCard = createAction(
  'CREATE_CARD',
  props<{ card: AdminCard }>()
);

export const updateState = createAction(
  'UPDATE_STATE',
  props<{ cards: UserCard[] }>()
);
