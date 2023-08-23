import {Injectable} from '@angular/core';
import {v4 as uuid} from 'uuid';

import {ShoppingItem} from '../store/models/shopping-item.model';
import {Observable, of} from 'rxjs';
import {delay, switchMap} from 'rxjs/operators';

const DELAY_TIME = 500;
@Injectable({
  providedIn: 'root',
})
export class ShoppingService {
  constructor() {}

  getShoppingItems(): Observable<ShoppingItem[] | Error> {
    const items: ShoppingItem[] = this.getItems();
    return of(items).pipe(delay(DELAY_TIME));
  }

  addShoppingItem(shoppingItem: ShoppingItem): Observable<ShoppingItem | Error> {
    const items: ShoppingItem[] = this.getItems();
    const newShoppingItem: ShoppingItem = {
      id: uuid(),
      name: shoppingItem.name,
    } as ShoppingItem;
    items.push(newShoppingItem);

    return this.saveItems(items).pipe(
      switchMap(() => of(newShoppingItem)),
      delay(DELAY_TIME),
    );
  }

  deleteShoppingItem(itemId: string): Observable<string | Error> {
    const items: ShoppingItem[] = this.getItems().filter(
      (item: ShoppingItem) => item.id !== itemId,
    );

    return this.saveItems(items).pipe(
      switchMap(() => of(itemId)),
      delay(DELAY_TIME),
    );
  }

  private getItems(): ShoppingItem[] {
    let items = JSON.parse(localStorage.getItem('shopping-list'));
    if (!Array.isArray(items)) {
      items = [];
    }
    return items as ShoppingItem[];
  }

  private saveItems(items: ShoppingItem[]) {
    return of(localStorage.setItem('shopping-list', JSON.stringify(items)));
  }
}
