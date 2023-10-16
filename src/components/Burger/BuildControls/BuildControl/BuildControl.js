import React from "react";
import classes from "./BuildControl.css";

const buildControl = (props) => (

    <div className={classes.BuildControl}>
        <div className={classes.Label}>{props.label}</div>
        <button className={classes.Less} onClick={props.removed} disabled={props.dis}>Less</button>
        <button className={classes.More} onClick={props.added}>More</button>
    </div>
    
    // button onClick -> removed from BuildControls.js
    // removed -> removeIng from burgerBuilder.js

    // disabled is a default property as onClick, used to disable the button
);

export default buildControl;
