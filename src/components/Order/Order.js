import React from 'react';
import classes from './Order.css';

const order = (props) => {

    const ingredients = [];
    
    for (let name in props.ingredients) {
            ingredients.push(
               { _name:  name,
                _amount: props.ingredients[name]}
        );
    }

    const ingredientsOutput  = ingredients.map(i => {
        return <span key = {i._name} className={classes.Span}>{i._name}: {i._amount}</span>
    });
     
    return (
        <div className={classes.Order}>
        <p>Ingredients: {ingredientsOutput}</p>
        <p>TotalPrice: <strong>USD {Number.parseFloat(props.price).toFixed(2)}</strong></p>
    </div>
);

}
// price is a string initially


export default order;