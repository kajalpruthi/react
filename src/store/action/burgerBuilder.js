import * as actionTypes from "./actionTypes";
import axios from "../../axios-orders";


export const addIngredient = (name) => {
    return{
        // 1. type
        type:actionTypes.ADD_INGREDIENT,
        // 2. payLoad
        ingredientName:name,
    }
}

export const removeIngredient = (name) => {
    return{
        // 1. type
        type:actionTypes.REMOVE_INGREDIENT,
        // payLoad
        ingredientName:name,
    }
}

export const setIngredients = (ingredients) => {
    return{
        // 1. type
        type: actionTypes.SET_INGREDIENTS,
        // 2. payLoad
        ingredientsObject: ingredients
    }
};

export const fetchIngredientsFailed = () => {
    return{
        // 1. type
        type: actionTypes.FETCH_INGREDIENTS_FAILED,
    };
};

export const initIngredients = () => {
    return dispatch => {
        axios.get('https://burger-builder-5ed13-default-rtdb.firebaseio.com/ingredients.json')
            .then(response => {
                dispatch(setIngredients(response.data));
            })
            .catch(error => {
                dispatch(fetchIngredientsFailed());
            });
    };
}


// burgerBuilder.js (main file) -> this file -> reducer