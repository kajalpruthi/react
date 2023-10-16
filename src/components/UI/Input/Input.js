import React from "react";
import classes from './Input.css';

const input = (props) => {

    let inputElement = null;
    const inputClasses = [classes.InputEle];

    // Add a class only when if the input is not valid
    if(props.invalid && props.touched){
        inputClasses.push(classes.Invalid);
    }

    switch (props.elementType){
        case('input'): 
            inputElement = <input {...props.elementConfig} className={inputClasses.join(' ')} value={props.value} onChange={props.changed}/>;
            break;
        
        case('textarea'):
            inputElement = <textarea {...props.elementConfig} className={inputClasses.join(' ')} value={props.value} onChange={props.changed}/>;
            break;

        case('select'):
            inputElement = <select 
                        {...props.elementConfig} 
                        className={inputClasses.join(' ')}
                        value={props.value} 
                        onChange={props.changed}>
                        {props.elementConfig.options.map(option => (
                            <option value = {option.value} key ={option.value}>{option.displayValue}</option>
                        ))}
                        </select>;
            break;

        default:
            inputElement = <input {...props.elementConfig} className={inputClasses} value={props.value}/>;
    }

    // Props - elementType, elementConfig, value, changed, touched, invalid

    // Explanation of touched - it is initally false, and this will be true only if we touch any of the input field
    // Due to this, invalid class is not shown at first

    return(
        <div className={classes.Input}>
            <label className={classes.Label}>{props.label}</label>
            {inputElement}
        </div>
    );
}

export default input;