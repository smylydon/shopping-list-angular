import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';
import * as fromShopping from './reducers/shopping.reducer';

export interface State {
  shopping: fromShopping.ShoppingState;
}

export const reducers: ActionReducerMap<State> = {
  shopping: fromShopping.shoppingReducer,
};

export const selectShoppingState = createFeatureSelector<fromShopping.ShoppingState>('shopping');

export const selectShopping = createSelector(
  selectShoppingState,
  fromShopping.selectAllShoppingItemEntities,
);
export const selectShoppingIsLoading = createSelector(
  selectShoppingState,
  (state) => state.loading,
);
export const selectShoppingError = createSelector(selectShoppingState, (state) => state.error);
