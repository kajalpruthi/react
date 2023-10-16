import React from "react";
import classes from "./Modal.css";
import Aux from "../../../hoc/Auxi";
import Backdrop from "../Backdrop/Backdrop";


const modal = props =>{

    return(
        <Aux>
            <div className={classes.Modal}
                style={{
                    transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
                    opacity: props.show ? '1' : '0',
                }}>
                {props.children}
            </div>

        <Backdrop bg={props.show} clicked={props.modalClosed}/>
    </Aux>  
    )
}
      
// Improving the performance using a higher order component called memo by preventing unnecessary renders
// If old and new states are same, do not order the modal component
export default React.memo(modal, (prevProps, nextProps) => nextProps.show === prevProps.show && nextProps.children === prevProps.children);
// export default modal;

// Is order state in burgerBuilder is true then modal will be shown, It contains backdrop and orderSummary
// modalClosed(burgerBuilder) -> clicked(Modal) ->Backdrop -> onClick = props.clicked