import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';

import { Ingredient } from '../../models/ingredient.model';
import { ShoppingListService } from '../../services/shopping-list.service';
import { Store } from '@ngrx/store';
import * as fromShoppingList from './store/shopping-list.reducer';
import * as ShoppingListActions from './store/shopping-list.actions';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html'
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Observable<{ ingredients: Ingredient[] }> ;

  constructor(
    private slService: ShoppingListService,
    private store: Store<fromShoppingList.AppState> 
  ) { }

  ngOnInit() {
    this.ingredients = this.store.select('shoppingList');
  }

  ngOnDestroy() {
  }

  onEditShoppingListItem(index: number) {
    // this.slService.isEdited.next(index);
    this.store.dispatch(new ShoppingListActions.StartEdit(index));
  }
}
