import React from "react";
import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import classes from "./SideDrawer.css"
import Backdrop from "../../UI/Backdrop/Backdrop";
import Aux from "../../../hoc/Auxi";

const sideDrawer = (props) => {

    // default classes, classes.Close
    let attachedClasses = [classes.SideDrawer, classes.Close];

    // changing the class if state is true
    if(props.show){
        attachedClasses = [classes.SideDrawer, classes.Open];   
    }
  
    return(
        <Aux>
            <div className={classes.Backdrop}><Backdrop bg={props.show} clicked={props.closed}/></div>
            <div className={attachedClasses.join(' ')}>
                <div className={classes.Logo}>
                    <Logo/>
                </div>
                <nav>
                    <NavigationItems isAuthenticated = {props.isAuth} clicked={props.closed}/>
                </nav>
            </div>
        </Aux>
    );

}; 

export default sideDrawer;

// SIDEDRAWER IS ADDED INTO LAYOUT - IT IS ONLY FOR MOBILE VIEW
// Adding a logo class specially into sidedrawer to adjust the size here

