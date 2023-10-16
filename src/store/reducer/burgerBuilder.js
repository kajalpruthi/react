import * as actionTypes from '../action/actionTypes';

// Managing the ingredients data through redux
const initialState = {

    // ingredientsObject: {
    //     Salad:1,
    //     Bacon:1,
    //     Cheese:1,
    //     Meat:1
    // },
    // Instead of writing ingredients manually, fetch the same from database

    ingredientsObject: null,
    totalPrice: 5,
    error: false,

    // set to true whenever there's a change in the ingredients
    ingredientsChanged: false,
};

// Mapping of type/name to price
const INGREDIENT_PRICES = {
    Salad: 0.5,
    Cheese: 0.7,
    Meat: 1.5,
    Bacon: 0.8
  }

const reducer = (state = initialState, action) => {

    switch(action.type){

        case actionTypes.ADD_INGREDIENT:

            return{
                	...state,
                    ingredientsObject: {
                        ...state.ingredientsObject,
                        //access that changed ingredient
                        [action.ingredientName] : state.ingredientsObject[action.ingredientName] + 1,
                    },
                    totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
                    ingredientsChanged: true,
                }

        case actionTypes.REMOVE_INGREDIENT:
                                        
            return{
                    ...state,
                    ingredientsObject: {
                        ...state.ingredientsObject,
                        [action.ingredientName] : state.ingredientsObject[action.ingredientName] - 1,
                    },
                    totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName],
                    ingredientsChanged: true,
                }

        case actionTypes.SET_INGREDIENTS:

            return{
                    ...state,
                    ingredientsObject: action.ingredientsObject,
                    totalPrice: 5,
                    error: false,
                    
                    // For next time
                    ingredientsChanged: false,
            }


        case actionTypes.FETCH_INGREDIENTS_FAILED:

            return{
                    ...state,
                    error: true,
                    totalPrice: 5,
            }
        
        default:
            return state;
    }
};

export default reducer;


// ingredientName is a prop passed in burgerBuilder.js