import React from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';
import { Route, useNavigate, Routes, Navigate} from "react-router-dom";
import {connect} from "react-redux";

const checkout = props => {

   const navigate = useNavigate();

   const checkoutCancelHandler = () =>{
     navigate('/');
    }

    const checkoutContinueHandler = (props) => {
      navigate("/checkout/contact-data", { replace: true });
    }

    // 1. Returing to the home page on refresh; As on refresh ingredients becomes null    
    let summary = <Navigate to = "/"/>

    // 2. if purchase is completed redirect to home page 
    const purchasedRedirect = props.purchased ? <Navigate to = "/orderplaced" ingredients={props.ings}/> : null

    if(props.ings){
        summary = (
            <div>
              {purchasedRedirect}

              <CheckoutSummary
                ingredients={props.ings}
                checkoutCancelled={checkoutCancelHandler}
                checkoutContinued={checkoutContinueHandler}
              />
              <Routes>
                <Route path="/contact-data" element={<ContactDataWrapper/>}/>
              </Routes>
            </div>
        )
    }

    return summary;
}

// display contact data on continue within the same page
const ContactDataWrapper = (props) => {
    const navigate = useNavigate();
    return <ContactData navigate={navigate}/>;
  }

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredientsObject,
        purchased: state.order.purchased,
    }
}

export default connect(mapStateToProps)(checkout);
