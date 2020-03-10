import { Ingredient } from 'src/app/models/ingredient.model';
import {
  ShoppingListActions,
  ADD_INGREDIENT,
  ADD_INGREDIENTS,
  UPDATE_INGREDIENT,
  DELETE_INGREDIENT,
  START_EDIT,
  STOP_EDIT
} from './shopping-list.actions';

export interface State {
  ingredients: Ingredient[];
  editedIngredient: Ingredient;
  editedIngredientIndex: number;
}

const initialState: State = {
  ingredients: [
    new Ingredient('Sausage', 5, 'piece'),
    new Ingredient('Cheese', 500, 'gr'),
    new Ingredient('Sauce', 300, 'ml')
  ],
  editedIngredient: null,
  editedIngredientIndex: -1
};

export function shoppingListReducer(
  state: State = initialState,
  action: ShoppingListActions
) {
  switch (action.type) {
    case ADD_INGREDIENT:
      return {
        ...state,
        ingredients: [ ...state.ingredients, action.payload ]
      };
    case ADD_INGREDIENTS:
      return {
        ...state,
        ingredients: [ ...state.ingredients, ...action.payload ]
      };
    case UPDATE_INGREDIENT:
      const ingredient = state.ingredients[state.editedIngredientIndex];
      const updatedIngredient = {
        ...ingredient,
        ...action.payload
      };
      const updatedIngredients = [...state.ingredients];
      updatedIngredients[state.editedIngredientIndex] = updatedIngredient;
      return {
        ...state,
        ingredients: updatedIngredients,
        editedIngredientIndex: -1,
        editedIngredient: null
      };

    case DELETE_INGREDIENT:
      return {
        ...state,
        ingredients: state.ingredients.filter((ing, i) => {
          return i !== state.editedIngredientIndex;
        }),
        editedIngredientIndex: -1,
        editedIngredient: null
      };

    case START_EDIT:
      return {
        ...state,
        editedIngredientIndex: action.payload,
        editedIngredient: { ...state.ingredients[action.payload] }
      };

    case STOP_EDIT:
      return {
        ...state,
        editedIngredientIndex: -1,
        editedIngredient: null
      };

    default: 
    return state;
  }
}