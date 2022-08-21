import {Injectable} from '@angular/core';
import {Actions, Effect, ofType, createEffect} from '@ngrx/effects';
import {
  addItemFailureAction,
  addItemSuccessAction,
  deleteItemFailureAction,
  deleteItemSuccessAction,
  loadShoppingSuccessAction,
  loadShoppingFailureAction,
  ShoppingActionTypes,
} from '../actions/shopping.actions';
import {of} from 'rxjs';
import {mergeMap, map, catchError} from 'rxjs/operators';
import {ShoppingService} from 'src/app/services/shopping.service';
import {ShoppingItem} from '../models/shopping-item.model';

@Injectable()
export class ShoppingEffects {
  constructor(private actions$: Actions, private shoppingService: ShoppingService) {}

  loadShopping$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ShoppingActionTypes.LOAD_SHOPPING),
      mergeMap(() =>
        this.shoppingService.getShoppingItems().pipe(
          map((shoppingList: ShoppingItem[]) => loadShoppingSuccessAction({shoppingList})),
          catchError((error: Error) => of(loadShoppingFailureAction({error}))),
        ),
      ),
    ),
  );

  addShoppingItem$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ShoppingActionTypes.ADD_ITEM),
      mergeMap(({shoppingItem}: {shoppingItem: ShoppingItem}) =>
        this.shoppingService.addShoppingItem(shoppingItem).pipe(
          map((shoppingItem: ShoppingItem) => addItemSuccessAction({shoppingItem})),
          catchError((error: Error) => of(addItemFailureAction({error}))),
        ),
      ),
    ),
  );

  deleteShoppingItem$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ShoppingActionTypes.DELETE_ITEM),
      mergeMap(({shoppingItemId}: {shoppingItemId: string}) =>
        this.shoppingService.deleteShoppingItem(shoppingItemId).pipe(
          map((deletedShoppingItemId: string) =>
            deleteItemSuccessAction({shoppingItemId: deletedShoppingItemId}),
          ),
          catchError((error: Error) => of(deleteItemFailureAction({error}))),
        ),
      ),
    ),
  );
}
