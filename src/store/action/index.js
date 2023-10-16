// It contains data from actions file that can be used as a function, using this.props.func();

export {addIngredient, removeIngredient, initIngredients} from "./burgerBuilder";
export {purchaseBurger, purchaseInit, fetchOrders} from "./order";
export {getAuth, logout, setAuthRedirectPath, authCheckState, clearError} from "./auth";