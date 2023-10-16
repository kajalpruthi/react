import React from "react";
import classes from "./DrawerToggle.css";

const drawerToggle = (props) => (

    <div className={classes.DrawerToggle} onClick={props.clicked}>
        {/* <div>MENU</div> */}
        <div></div>
        <div></div>
        <div></div>
    </div>
);

export default drawerToggle;

// 1. Click On Menu
// 2. State becomes true
// 3. If state is true then show(in Layout.js) actives to SideDrawer
// 3.1 It shows backDrop in the backgroud as well
// 3.2 When we click on backDrop state becomes false again
// 4. SideDrawer use different classes for true and false.
// 5. For true it uses .Open else it uses .Close that have different translate properties
