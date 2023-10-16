import React, { useState } from "react";
import Aux from "../../hoc/Auxi";
import classes from "./Layout.css";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";
import {connect} from "react-redux";

const layout  = (props) => {
  
  // managing state
  const [showSideDrawer, setShowSideDrawer] = useState(false);

  const sideDrawerClosedHandler = () => {
    setShowSideDrawer(false);
  }

  const sideDrawerToggleHandler = () => {
    setShowSideDrawer(!showSideDrawer);
  }

    return(
      <Aux>
        <Toolbar 
          isAuth = {props.isAuthenticated}
          drawerToggleClicked={sideDrawerToggleHandler}/>

        <SideDrawer 
          isAuth = {props.isAuthenticated}
          show={showSideDrawer} 
          closed={sideDrawerClosedHandler}/>

        {/* MAIN VIEW */}
        <main className={classes.Content}>
            {props.children}
        </main>
      </Aux>
    )
  //  <div>Toolbar, SideDrawer, Backdrop</div> 
}

const mapStateToProps = state => {
  return{
    isAuthenticated: state.auth.token !== null
  }
}

export default connect(mapStateToProps)(layout);

