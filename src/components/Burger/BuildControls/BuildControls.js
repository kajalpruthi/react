import React from "react";
import classes from "./BuildControls.css";
import BuildControl from "./BuildControl/BuildControl";

const controls = [
  { label: "Bacon", type: "Bacon" },
  { label: "Cheese", type: "Cheese" },
  { label: "Meat", type: "Meat" },
  { label: "Salad", type: "Salad" }
];

// By this, for every label there will be labelName, more & less buttons
const buildControls = (props) => (
    <div className={classes.BuildControls}>

          <p>Current Price: {props.price.toFixed(2)}$</p>

          {controls.map(para => (
            <BuildControl label={para.label} 
                          key={para.label} 
                          added={() => props.addIng(para.type)}
                          removed={() => props.removeIng(para.type)}
                          dis={props.disabled[para.type]}/>
         ))}

         <button 
                className={classes.OrderButton} 
                disabled={!props.purchasable}
                onClick={props.ordered}>
                {props.isAuth ? 'ORDER NOW': 'SIGN IN TO ORDER' }
                </button>
    </div>
);

export default buildControls;

// disabled - true , will disable

// ORDER
// click -> ordered -> state is true now(orderBtnHandler in burgerBuilder) :) -> make changes in modal
// Reason - When the state changes in React, the component is re-rendered to reflect the updated state. 