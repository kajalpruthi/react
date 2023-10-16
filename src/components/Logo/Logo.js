import React from "react";
import classes from "./Logo.css";
import burgerLogo from '../../assets/images/burger-logo.png';


const logo  = (props) => (
    
    <div className={classes.Logo}>
        <img src={burgerLogo} alt="Burger"/>
    </div>
);

export default logo;

// Import image, as webpack gonna bundle all this, so src will not work