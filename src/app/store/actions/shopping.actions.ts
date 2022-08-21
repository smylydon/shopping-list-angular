import {createAction, props} from '@ngrx/store';
import {ShoppingItem} from '../models/shopping-item.model';

export enum ShoppingActionTypes {
  ADD_ITEM = '[SHOPPING] Add Item',
  ADD_ITEM_SUCCESS = '[SHOPPING] Add Item Success',
  ADD_ITEM_FAILURE = '[SHOPPING] Add Item Failure',
  DELETE_ITEM = '[SHOPPING] Delete Item',
  DELETE_ITEM_SUCCESS = '[SHOPPING] Delete Item Success',
  DELETE_ITEM_FAILURE = '[SHOPPING] Delete Item Failure',
  LOAD_SHOPPING = '[SHOPPING] Load Shopping',
  LOAD_SHOPPING_SUCCESS = '[SHOPPING] Load Shopping Success',
  LOAD_SHOPPING_FAILURE = '[SHOPPING] Load Shopping Failure',
}

export const addItemAction = createAction(
  ShoppingActionTypes.ADD_ITEM,
  props<{shoppingItem: ShoppingItem}>(),
);

export const addItemSuccessAction = createAction(
  ShoppingActionTypes.ADD_ITEM_SUCCESS,
  props<{shoppingItem: ShoppingItem}>(),
);

export const addItemFailureAction = createAction(
  ShoppingActionTypes.ADD_ITEM_FAILURE,
  props<{error: Error}>(),
);

export const deleteItemAction = createAction(
  ShoppingActionTypes.DELETE_ITEM,
  props<{shoppingItemId: string}>(),
);

export const deleteItemSuccessAction = createAction(
  ShoppingActionTypes.DELETE_ITEM_SUCCESS,
  props<{shoppingItemId: string}>(),
);

export const deleteItemFailureAction = createAction(
  ShoppingActionTypes.DELETE_ITEM_FAILURE,
  props<{error: Error}>(),
);

export const loadShoppingAction = createAction(ShoppingActionTypes.LOAD_SHOPPING);

export const loadShoppingSuccessAction = createAction(
  ShoppingActionTypes.LOAD_SHOPPING_SUCCESS,
  props<{shoppingList: ShoppingItem[]}>(),
);

export const loadShoppingFailureAction = createAction(
  ShoppingActionTypes.LOAD_SHOPPING_FAILURE,
  props<{error: Error}>(),
);
