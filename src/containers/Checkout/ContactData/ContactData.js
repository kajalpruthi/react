import React, { useState } from "react";
import Button from "../../../components/UI/Button/Button";
import classes from "./ContactData.css"
import axios from "../../../axios-orders";
import Spinner from "../../../components/UI/Spinner/Spinner"
import Input from "../../../components/UI/Input/Input";
import {connect} from 'react-redux';
import * as actions from "../../../store/action/index"
import withErrorHandler from "../../../hoc/withErrorHandler/withErrorHandler";

const contactData = props => {

  // State-1
  const[orderForm, setOrderForm] = useState({
        name: {
             elementType: 'input',
             elementConfig: {
                  type: 'text',
                  placeholder: 'Your Name...'
             },
             value: "",
             validation: {
                 required: true,
                 isChar: true,
             },
             valid: false,
             touched: false,
        },

        email: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Enter a valid E-mail Address...'
            },
            value: "",
            validation: {
                required: true,
                isEmail: true,
            },
            valid: false,
            touched: false,
        },

        street: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Enter street...'
            },
            value: "",
            validation: {
                required: true,
            },
            valid: false,
            touched: false,
        },

        zipCode: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Enter ZIP Code...'
            },
            value: "",
            validation: {
                required: true,
                isNumeric: true,
                minLength: 5,
                maxLength: 10,
            },
            valid: false,
            touched: false,
        },

        country: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Your Country...'
            },
            value: "",
            validation: {
                required: true,
                isChar: true,
            },
            valid: false,
            touched: false,
        },

        deliveryMethod: {
          elementType: 'select',
          elementConfig: {
              options: [
                {value: 'fastest', displayValue: 'Fastest'},
                {value: 'cheapest', displayValue: 'Cheapest'}
              ],
          },
          valid: true,
          value: 'fastest', // Set the default value to the first option value
      },
    })

  // state-2
  const [formIsValid, setFormIsValid] = useState(false);



  // ***** FUNCTIONS
  const orderHandler = (event) => {
      event.preventDefault();

      const formData = {};
      for(let i in orderForm){
        formData[i] = orderForm[i].value;
      }

      const order = {
        ingredients: props.ings,
        price: props.price,
        orderData: formData,
        userId: props.userId
      }

      props.onOrderBurger(order, props.token);
  }


  const checkValidity = (value, rules) => {

    let isValid = true;

    // if rules are not defined i.e. in case of select
    if(!rules){
      return true;
    }

    if (rules.required) {
      isValid = value.trim() !== '' && isValid;
    }

    if (rules.isEmail) {
      const pattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
      isValid = pattern.test(value) && isValid;
    }

    if (rules.isChar) {
      const pattern = /^[A-Za-z]+$/;
      isValid = pattern.test(value) && isValid;
    }

    if (rules.isNumeric) {
      const pattern = /^[0-9]+$/;
      isValid = pattern.test(value) && isValid;
    }

    // validity for zip code
    if(rules.minLength){
      isValid = value.length >= rules.minLength && isValid;
    }

    if(rules.maxLength){
      isValid = value.length <= rules.maxLength && isValid;
    }

    // returns true if all the conditions are true
    return isValid;
  }


  // value gets changed on click
  const inputChangedHandler = (event, i) => {

      // get the entire elements of orderForm
      const updatedOrderForm = {...orderForm};
  
      // get a particular field out of all
      const updatedFormElement = {...updatedOrderForm[i]};
  
      // update its value
      updatedFormElement.value = event.target.value;

      // check for the validity
      updatedFormElement.valid = checkValidity(updatedFormElement.value, updatedFormElement.validation);
      updatedFormElement.touched = true;

      // move back
      updatedOrderForm[i] = updatedFormElement;

      // show the order button when all input fields are valid
      let formValid = true;
      for(let key in updatedOrderForm){
        formValid = updatedOrderForm[key].valid && formValid;
        // console.log(formValid);
      }

      // setting the states
      setOrderForm(updatedOrderForm);
      setFormIsValid(formValid);
  };


  // CREATING FORM DYNAMICALLY

  // 1. Push into array
  const formElementsArray = [];

  for (let key in orderForm) {
    formElementsArray.push({
      id : key,
      info : orderForm[key]
    })
    
  }

  // Imported our own input class
  //  2. Access the array 

  let form = (
      <form onSubmit={orderHandler}>
        {formElementsArray.map(formElement => (
          <Input 
            key = {formElement.id}
            elementType = {formElement.info.elementType}
            elementConfig = {formElement.info.elementConfig}
            value = {formElement.info.value}
            invalid = {!formElement.info.valid}
            touched = {formElement.info.touched}
            changed = {(event) => inputChangedHandler(event, formElement.id)}/>
        ))}
        <Button btnType="Success" clicked={orderHandler} disabled={!formIsValid}>ORDER</Button>
    </form>
  );

  if (props.loading) {
      form = <Spinner/>
  }

  return (
    <div className={classes.ContactData}>
      <h4>Enter Your Contact Data</h4>
        {form}
    </div>
  );
}


const mapStateToProps = state => {
  return{
    ings: state.burgerBuilder.ingredientsObject,
    price: state.burgerBuilder.totalPrice,
    loading: state.order.loading,
    token: state.auth.token,
    userId: state.auth.userId,
  }
}

const mapDispatchToProps = dispatch => {
  return{
    onOrderBurger: (orderData, token) => dispatch(actions.purchaseBurger(orderData, token))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(contactData, axios));
