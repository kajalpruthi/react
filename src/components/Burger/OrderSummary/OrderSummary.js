import React from "react";
import Aux from "../../../hoc/Auxi";
import Button from "../../UI/Button/Button";

const orderSummary = props => {

    const ingredientSummary = Object.keys(props.ingredients)
    .map(name => {
        return(
            <li key = {name}>
                {name}: {props.ingredients[name]}  
            </li>
        )
    })

    return(
        <Aux>
            <h3>Your Order</h3>
            <p>A delicious burger with the following ingredients:</p>
            <ul>
                {ingredientSummary}
            </ul>
            <h4>Total Price: {props.price.toFixed(2)}</h4>
            <p>Continue to Checkout?</p>
            <Button btnType="Danger" clicked={props.cancel}>CANCEL</Button>
            <Button btnType="Success" clicked={props.continue}>CONTINUE</Button>
        </Aux>
    );       
}
   

// Cancel = In orderCancel(burgerBuilder) in OrderSummary -> props.cancel(thisFile) -> props.clicked(Button.js)

export default orderSummary;


