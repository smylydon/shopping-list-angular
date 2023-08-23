import {Component, OnInit} from '@angular/core';
import {AppState} from './store/models/app-state.model';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {ShoppingItem} from './store/models/shopping-item.model';
import {
  addItemAction,
  deleteItemAction,
  loadShoppingAction,
} from './store/actions/shopping.actions';
import {selectShopping, selectShoppingError, selectShoppingIsLoading} from './store';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  public shoppingItems$: Observable<ShoppingItem[]>;
  public hasShoppingItems$: Observable<boolean>;
  public loading$: Observable<boolean>;
  public error$: Observable<Error>;

  public newShoppingItem: ShoppingItem = {id: '', name: ''};
  private title = 'ngrx-shopping-list';

  constructor(private store: Store<AppState>, private titleService: Title) {}

  ngOnInit(): void {
    this.titleService.setTitle(this.title);
    this.shoppingItems$ = this.store.select(selectShopping);
    this.loading$ = this.store.select(selectShoppingIsLoading);
    this.error$ = this.store.select(selectShoppingError);
    this.hasShoppingItems$ = this.shoppingItems$.pipe(
      map((items: ShoppingItem[]) => {
        const result = Array.isArray(items) && items.length > 0;
        return result;
      }),
    );

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
