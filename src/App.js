import React, {useEffect} from "react";
import "./App.css";
import Layout from "./components/Layout/Layout";
import BurgerBuilder from "./containers/burgerBuilder/burgerBuilder";
import Checkout from "./containers/Checkout/Checkout";
import Orders from  "./containers/Orders/Orders";
import Authentication from "./containers/Authentication/Authentication";
import Logout from "./containers/Authentication/Logout/Logout";
import OrderPlaced from "./containers/orderPlaced/orderPlaced";
import {Route, Routes, useLocation, useNavigate} from "react-router-dom";
import * as actions from './store/action/index';
import { connect } from "react-redux";


const app = (props) => {

  // This will only render once (after refresh) when the components are mounted initially
  // After refreshing still we are logged in

  // using [] - useEffect will work only on first time we refreshed the page
  const {onTryAutoSignUp} = props;
  useEffect(() => {
    onTryAutoSignUp();
  }, [onTryAutoSignUp])

  
    let routes = (

      // Preventing directing running of order and checkout pages via link without authentication
      <Routes>
        <Route path="/" exact element={<BurgerBuilderWrapper/>} />
        <Route path="/authentication"  element={<AuthenticationWrapper/>} />
        <Route path="/*" element={<BurgerBuilderWrapper/>}/>
      </Routes>
    );

    if(props.isAuthenticated){
      routes = (
        <Routes>
          <Route path="/" exact element={<BurgerBuilderWrapper/>} />
          <Route path="/checkout/*" element={<CheckoutWrapper/>} />
          <Route path="/orders"  element={<Orders />} />
          <Route path="/logout"  element={<LogoutWrapper/>} />
          <Route path="/orderplaced"  element={<OrderPlacedWrapper/>} />
          <Route path="/authentication"  element={<AuthenticationWrapper/>} />
          {/* <Route path="/*" element={<BurgerBuilderWrapper/>}/> */}
        </Routes>
      )
    }


  return (
    <div>
      <Layout/>
      {routes}
    </div>
   );
}


const BurgerBuilderWrapper = () => {
  const navigate = useNavigate();
  const location = useLocation();
  return <BurgerBuilder navigate={navigate} location={location}/>;
};

const CheckoutWrapper = () => {
  const navigate = useNavigate();
  const location = useLocation();
  return <Checkout navigate={navigate} location={location}/>;
};

const AuthenticationWrapper = () => {
  const navigate = useNavigate();
  const location = useLocation();
  return <Authentication navigate={navigate} location={location}/>;
};

const LogoutWrapper = () => {
  const navigate = useNavigate();
  const location = useLocation();
  return <Logout navigate={navigate} location={location}/>;
};

const OrderPlacedWrapper = () => {
  const navigate = useNavigate();
  const location = useLocation();
  return <OrderPlaced navigate={navigate} location={location}/>;
}


const mapStateToProps = state => {
  return{
    isAuthenticated: state.auth.token !== null
  }
}

const mapDispatchToProps = dispatch => {
  return{
      onTryAutoSignUp: () => dispatch(actions.authCheckState()) 
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(app);
