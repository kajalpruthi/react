import * as actionTypes from "./actionTypes";
import axios from "../../axios-orders";


export const purchaseBurgerSuccess = (id, orderData) => {
    return{
        // 1. type
        type:actionTypes.PURCHASE_BURGER_SUCCESS,
        // 2. payLoads
        orderId: id,
        orderData: orderData,
    }; 
}


export const purchaseBurgerFail = (error) => {
    return{
        // 1. type
        type:actionTypes.PURCHASE_BURGER_FAIL,
        // 2. payLoad
        error: error,
    };
}

export const purchaseBurgerStart = () => {
    return{
        type: actionTypes.PURCHASE_BURGER_START,
    }
}


export const purchaseBurger = (orderData, token) => {
    return dispatch => {
        // This function will start loading
        dispatch(purchaseBurgerStart());
        // Loading stops

        axios.post('/orders.json?auth=' + token, orderData)
        .then(response => {
            dispatch(purchaseBurgerSuccess(response.data.name, orderData));
         })
        .catch(error => {
            dispatch(purchaseBurgerFail(error))
       });
    };
}


export const purchaseInit = () => {
    return{
        type: actionTypes.PURCHASE_INIT
    };
}


//           *****************


export const fetchOrdersSuccess = (orders) => {
    return{
        // 1. type
        type:actionTypes.FETCH_ORDERS_SUCCESS,
        // 2. payLoads
        orderList: orders,
    }; 
}


export const fetchOrdersFail = (error) => {
    return{
        // 1. type
        type:actionTypes.FETCH_ORDERS_FAIL,
        // 2. payLoad
        error: error,
    };
}

export const fetchOrdersStart = () => {
    return{
        type: actionTypes.FETCH_ORDERS_START,
    }
}


export const fetchOrders = (token, userId) => {
    return dispatch => {

         // This function will start loading
         dispatch(fetchOrdersStart());
         // Loading stops

        // Displaying User Specific Orders - make a slight change in rules -> ".indexOn": ["userId"]
        const queryParams = '?auth=' + token + '&orderBy="userId"&equalTo="' + userId + '"';

        axios.get('/orders.json' + queryParams)
             .then(res => {
                const fetchedOrders = [];
                for (let key in res.data) {
                    fetchedOrders.push({
                        ...res.data[key],
                        id: key});
                }
                dispatch(fetchOrdersSuccess(fetchedOrders));
             })
             .catch(error=>{
                dispatch(fetchOrdersFail(error));
             })
    };
}
