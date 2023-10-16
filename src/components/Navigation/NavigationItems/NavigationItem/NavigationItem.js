import React from "react";
import classes from "./NavigationItem.css";
import { NavLink, useMatch } from "react-router-dom";

const navigationItem = (props) => {

  // useMatch hook is used to determine if a given path or route matches the current URL location
  const isActive = useMatch(props.link);

  return(
    <li className={classes.NavigationItem}> 
        <NavLink to={props.link} className={isActive ? classes.active : null} onClick={props.clicked}>{props.children}</NavLink>
    </li>
  );
};

export default navigationItem;

// 3 props we are accepting here! 
// * link
// * active
// * props.children - extra text written, here it is name of that nav