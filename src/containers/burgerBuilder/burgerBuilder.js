import React, { useState, useEffect } from "react";
import Aux from "../../hoc/Auxi";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from "../../axios-orders";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import * as actions from "../../store/action/index";
import {connect} from 'react-redux';


const burgerBuilder = props => {
  
  // State of ingredients
    // 1. ingredientsObject from reducer
    // 2. totalPrice from reducer
    // 3. error from reducer
    // 4. When click on order button, displayes the summary

  const [order, setOrder] = useState(false);

// Fetching Ingredients from firebase
  const {onInitIngredients} = props;
  useEffect(() => {
      onInitIngredients();
  }, [onInitIngredients])
  

  // Function1: if no. of ingredients > 0, then only OrderNow button will work
  // sum of values on ingredients in an array
  const updatePurchaseState = () => {
    const totalIngredients = Object.values(props.ings).reduce((sum, el) => sum + el, 0);
    return totalIngredients > 0;
  }

  //Function2: Changing the state of order
  const orderBtnHandler = () =>{
    if(props.isAuthenticated){
      setOrder(true);
    }
    else{
      props.onSetAuthRedirectPath('/checkout');
      props.navigate('/authentication');
    }
  }

  //Function3: Cancel the order by changing its state to false
  const orderBtnCancelHandler = () =>{
      setOrder(false);
  }
    
  //Function4:  change the page on continue via navigate
  const orderContinueHandler = () => {
    props.onInitPurchased();
    props.navigate(`/checkout`);
  }

  // Accessing the state using disabledInfo PROPERTY
  const disabledInfo = {...props.ings};

  for(let value in disabledInfo) {
    disabledInfo[value] = disabledInfo[value] <= 0;
    // It will return true if value <= 0;
    // disabledInfo[value] will be replaced by type[count]
  }

// COMPONENT-1
let burger;

// COMPONENT-2
let orderSummary = null;

  //  1. If error occurs, don't display the burger
  if (props.error) {
    burger = (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '75vh' }}>
        <h3 style={{textAlign: 'center'}}>Oops! Ingredients couldn't load. Check your internet :(</h3>
      </div>
    );
  } 

  // 2. If there is no error display the spinner
  if(!props.error){
    burger = (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '75vh' }}>
        <Spinner />
      </div>
    );
  }

  // 3. If ingredients are not null then replace the burger with actual UI
  if (props.ings !== null) {
    burger = (
      <Aux>
        <Burger ingredients={props.ings}/>
          {/* Let allow user to choose ingredients */}
        <BuildControls price={props.price}
                        addIng={props.onIngredientAdded} 
                        removeIng={props.onIngredientRemoved}
                        disabled={disabledInfo}
                        purchasable={updatePurchaseState()}
                        isAuth = {props.isAuthenticated}
                        // it is making the state true
                        ordered={orderBtnHandler}/>
      </Aux>
    );
    orderSummary = <OrderSummary ingredients={props.ings}
    price={props.price}
    cancel={orderBtnCancelHandler}
    continue={orderContinueHandler}/>
  }


  return (
    <Aux>
      {burger}
      
{/* Show the summary if state(order) is true - initially state is false that's why orderSummary not display at first */}
      <Modal show={order} modalClosed={orderBtnCancelHandler}>  
        {orderSummary}   
      </Modal>

    </Aux>
  );
}

// state from reducers
const mapStateToProps = state =>  {
  return{
    ings: state.burgerBuilder.ingredientsObject,
    price: state.burgerBuilder.totalPrice,
    error: state.burgerBuilder.error,
    isAuthenticated: state.auth.token !== null 
  };
};

// functions from index
const mapDispatchToProps = dispatch => {
  return{
    onInitIngredients : () => dispatch(actions.initIngredients()),
    onIngredientAdded : (ingName) => dispatch(actions.addIngredient(ingName)),
    onIngredientRemoved : (ingName) => dispatch(actions.removeIngredient(ingName)),
    onInitPurchased : () => dispatch(actions.purchaseInit()),
    onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(burgerBuilder, axios));


// added(buildControl) -> addIng(buildControls) -> ingName(burgerBuilder) -> ingredientName(reducer)