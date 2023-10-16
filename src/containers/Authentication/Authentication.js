import React, {useState, useEffect} from 'react';
import classes from './Authentication.css'
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import * as actions from "../../store/action/index"
import {connect} from 'react-redux';
import {Navigate} from 'react-router-dom';


const auth = props => {


    const [controls, setControls] = useState({

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
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password with minimum 6 characters..'
                },
                value: "",
                validation: {
                    required: true,
                    minLength: 6,
                },
                valid: false,
                touched: false,
            },
        });

    // state: 2
    const[isSignup, setIsSignup] = useState(true);


    // Change the page according to the change in ingredients
    // This will change the authRedirectPath i.e. path

    const {ingredientsChanged, authRedirectPath, onSetAuthRedirectPath} = props;

    useEffect(() => {

        if(!ingredientsChanged && authRedirectPath !== '/'){
            onSetAuthRedirectPath();
        }

    //     // if(ingredientsChanged){
    //     //     props.onSetAuthRedirectPath('/checkout');;
    //     // }
    //     // else{
    //     //     props.onSetAuthRedirectPath('/');;
    //     // }
    }, [ingredientsChanged, authRedirectPath, onSetAuthRedirectPath])
    
    
  //  Function:1   
  const checkValidity = (value, rules) => {

    let isValid = true;

    if (rules.required) {
      isValid = value.trim() !== '' && isValid;
    }

    if (rules.isChar) {
        const pattern = /^[A-Za-z]+$/;
        isValid = pattern.test(value) && isValid;
      }
 
    if (rules.isEmail) {
      const pattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
      isValid = pattern.test(value) && isValid;
    }

    if(rules.minLength){
        isValid = value.length >= rules.minLength && isValid;
    }

    // returns true if all the conditions are true
    return isValid;
  }


  
  // Function2: value gets changed on click
  const inputChangedHandler = (event, id) => {

    const updatedControls = {
      ...controls,
      [id]: {
        ...controls[id],
        value: event.target.value,
        valid: checkValidity(event.target.value, controls[id].validation),
        touched: true,
      }
    };
    setControls(updatedControls);
};


    // Function3:
    const submitHandler = (event) => {
        event.preventDefault();
        props.onAuth(controls.email.value, controls.password.value, controls.name.value, isSignup)
    }

    // Function:4 
    const switchModeHandler = () => {
        setIsSignup(!isSignup);
        props.onClearError();
    }

    const formElementArray = [];

    for(let key in controls){

        // Skip the "Name" field while Signing In
        if (!isSignup && key === 'name') {
            continue; 
        }
        if(!isSignup && key === 'password'){
            controls[key].elementConfig.placeholder = 'Enter Password...'
        }
        formElementArray.push({
            id: key,
            info: controls[key],
            // info contains all the data of a particular key
        })
    }

    let form = formElementArray.map(element => (
            // element contains both id and info
                <Input 
                key = {element.id}
                // elementType = controls.controls[i].elementType
                elementType = {element.info.elementType}
                elementConfig = {element.info.elementConfig}
                value = {element.info.value}
                invalid = {!element.info.valid}
                touched = {element.info.touched}
                changed = {(event) => inputChangedHandler(event, element.id)}/>
        ))


    if (props.loading) {
        form = <Spinner/>
    }


    let errorMessage = null;
    if(props.error){
        errorMessage = (
            <p className={classes.ErrorMessage}>{props.error.message}!!</p>
        )
    }

    let authRedirect = null;

    if(props.isAuthenticated){
        authRedirect = <Navigate to = {props.authRedirectPath}/>
    }

    return(
        <div>
            {errorMessage}
            {authRedirect}


            <div className={classes.Authentication}>

                <h2 className={classes.Heading}>
                    {isSignup ? 'SIGN UP' : 'SIGN IN'}
                </h2>

                <form onSubmit={(event) => submitHandler(event)}>
                    {form}
                    <Button btnType="Success">SUBMIT</Button>
                </form>

                <Button btnType="Danger"
                    clicked={switchModeHandler}>SWITCH TO {isSignup ? 'SIGN IN' : 'SIGN UP'}
                </Button>
            </div>
        </div>
    )
}

const mapStateToProps = state => {
    return{
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.token !== null,
        ingredientsChanged: state.burgerBuilder.ingredientsChanged,
        authRedirectPath: state.auth.authRedirectPath,
        userId: state.auth.userId
    }
}

const mapDispatchToProps = dispatch => {
    return{
        onAuth: (email, password, displayName, isSignup) => dispatch(actions.getAuth(email, password, displayName, isSignup)),
        onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/')),
        onClearError: () => dispatch(actions.clearError())
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(auth);