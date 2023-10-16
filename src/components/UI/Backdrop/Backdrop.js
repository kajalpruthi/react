import React from "react";
import classes from "./Backdrop.css";

const backdrop = (props) => (

    props.bg ? <div className={classes.Backdrop} onClick={props.clicked}></div> : null
)
export default backdrop;

// props = bg, clicked

// If true, then change the state to false on click