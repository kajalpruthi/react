import React, {useEffect} from 'react';
import axios from '../../axios-orders';
import Order from '../../components/Order/Order';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from "../../store/action/index"
import {connect} from "react-redux";
import Spinner from "../../components/UI/Spinner/Spinner"


const orders = props => {

    // FETCHING ORDERS
    const {onFetchOrders} = props;
    useEffect(() => {
        onFetchOrders(props.token, props.userId);
    }, [onFetchOrders])
    

    let orders = <Spinner/>
    
    if (!props.loading) {
        orders = props.orders.map(i => (
                <Order 
                    key={i.id}
                    ingredients={i.ingredients}
                    price={i.price}/>
                ))
    }

    return (
        <div>
            {orders}
        </div>
    );
}

// order here is a reducer from index.js
const mapStateToProps = state => {
    return{
        orders: state.order.orders,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId
    }
}

const mapDispatchToProps = dispatch => {
    return{
        onFetchOrders: (token, userId) => dispatch(actions.fetchOrders(token, userId))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(orders, axios));