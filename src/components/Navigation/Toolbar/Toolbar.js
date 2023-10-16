import React from "react";
import classes from "./Toolbar.css";
import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import DrawerToggle from "../SideDrawer/DrawerToggle/DrawerToggle";


const toolbar  = (props) => (
    <header className={classes.Toolbar}>
        <DrawerToggle clicked={props.drawerToggleClicked}/>
        <Logo/>
        <nav className={classes.DesktopOnly}>
            <NavigationItems isAuthenticated = {props.isAuth}/>
        </nav>
    </header>
);

// ADD TOOLBAR IN LAYOUT COMPONENT
 
export default toolbar;

// <div>MENU</div> 
// <div>Logo</div> 
// <nav> <ul>...</ul> </nav> 

// Here we gonna add this 3 sub components

