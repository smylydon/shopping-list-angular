import {ShoppingItem} from '../models/shopping-item.model';
import {
  loadShoppingAction,
  loadShoppingSuccessAction,
  loadShoppingFailureAction,
  addItemAction,
  addItemSuccessAction,
  addItemFailureAction,
  deleteItemSuccessAction,
  deleteItemFailureAction,
  deleteItemAction,
} from '../actions/shopping.actions';
import {createReducer, on} from '@ngrx/store';
import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';

export interface ShoppingState extends EntityState<ShoppingItem> {
  loading: boolean | null | undefined;
  error: Error | null | undefined;
}

export const shoppingAdapter: EntityAdapter<ShoppingItem> = createEntityAdapter<ShoppingItem>();

export const initialState: ShoppingState = shoppingAdapter.getInitialState({
  loading: false,
  error: undefined,
});

const {selectIds, selectEntities, selectAll, selectTotal} = shoppingAdapter.getSelectors();

export const selectShoppingItemIds = selectIds;
export const selectShoppingItemEntities = selectEntities;
export const selectAllShoppingItemEntities = selectAll;
export const selectTotalShoppingItem = selectTotal;

export const shoppingReducer = createReducer(
  initialState,
  on(loadShoppingAction, (state, action) => {
    return {...state, loading: true, error: null};
  }),
  on(addItemAction, (state, action) => {
    return {...state, loading: true, error: null};
  }),
  on(addItemSuccessAction, (state, action) => {
    return shoppingAdapter.addOne(action.shoppingItem, {...state, loading: false, error: null});
  }),
  on(loadShoppingSuccessAction, (state, action) => {
    return shoppingAdapter.setAll(action.shoppingList, {...state, loading: false, error: null});
  }),
  on(deleteItemAction, (state, action) => {
    return {...state, loading: true, error: null};
  }),
  on(deleteItemSuccessAction, (state, action) => {
    return shoppingAdapter.removeOne(action.shoppingItemId, {
      ...state,
      loading: false,
      error: null,
    });
  }),
  on(addItemFailureAction, deleteItemFailureAction, loadShoppingFailureAction, (state, action) => {
    return {...state, loading: false, error: action.error};
  }),
);
