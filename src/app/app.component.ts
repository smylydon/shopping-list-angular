import {Component, OnInit} from '@angular/core';
import {AppState} from './store/models/app-state.model';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {ShoppingItem} from './store/models/shopping-item.model';
import {
  addItemAction,
  deleteItemAction,
  loadShoppingAction,
} from './store/actions/shopping.actions';
import {selectShopping, selectShoppingError, selectShoppingIsLoading} from './store';
import {Dictionary} from '@ngrx/entity';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  shoppingItems$: Observable<ShoppingItem[]>;
  loading$: Observable<boolean>;
  error$: Observable<Error>;

  newShoppingItem: ShoppingItem = {id: '', name: ''};
  title = 'ngrx-shopping-list';
  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.shoppingItems$ = this.store.select(selectShopping);
    this.loading$ = this.store.select(selectShoppingIsLoading);
    this.error$ = this.store.select(selectShoppingError);

    this.store.dispatch(loadShoppingAction());
  }

  addItem(): void {
    const shoppingItem = {
      id: undefined,
      name: this.newShoppingItem.name,
    } as ShoppingItem;

    this.store.dispatch(addItemAction({shoppingItem}));
    this.newShoppingItem = {id: '', name: ''};
  }

  deleteItem(shoppingItemId: string): void {
    this.store.dispatch(deleteItemAction({shoppingItemId}));
  }
}
