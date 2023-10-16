import React from "react";
import classes from "./Burger.css";
import BurgerIngredient from "./BurgerIngredient/BurgerIngredient";

const burger = (props) => {

    let transformedIngredients = [];

    // DISPLAY - 2 LOOPS
    for (let name in props.ingredients) {
        for (let i = 0; i < props.ingredients[name]; i++) {
            transformedIngredients.push(
               <BurgerIngredient key={name + i} type={name} />
        );
        }
    }

    // Means no ingredients will be shown
    if(transformedIngredients.length === 0){
        transformedIngredients = <p>Please Start Adding Ingredients!</p>
    }

    return (
        <div className={classes.Burger}>
        <BurgerIngredient type="bread-top" />
        {transformedIngredients}
        <BurgerIngredient type="bread-bottom" />
        </div>
    );
};

export default burger;
