import React from 'react';
import classes from './orderPlaced.css'
import Burger from '../../components/Burger/Burger';
import Button from '../../components/UI/Button/Button';
import {connect} from "react-redux";
import {useNavigate} from "react-router-dom";

const orderPlaced = (props) => {

    const navigate = useNavigate();

    return(
        <div className={classes.OrderPlaced}>
            <h2>Your order has been successfully placed!</h2>
            <div style={{width: '100%', margin: 'auto'}}>
                <Burger ingredients={props.ings}/>
            </div>
            <h4>Total Amount: {props.price.toFixed(2)}$</h4>
            <Button btnType="Success" clicked={() => navigate('/')}>OK</Button>
        </div>
    )
}


const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredientsObject,
        price: state.burgerBuilder.totalPrice
    }
}

export default connect(mapStateToProps)(orderPlaced);
