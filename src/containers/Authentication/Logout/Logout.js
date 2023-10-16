import React, { useEffect } from 'react';
import {connect} from 'react-redux';
import * as actions from "../../../store/action/index"
import {Navigate} from "react-router-dom";


const logout = props => {

    const {onLogout} = props;

    useEffect(() => {
         onLogout();
    }, [onLogout])
        
    return <Navigate to = "/"/>;
}

const mapDispatchToProps = dispatch => {
    return{
        onLogout: () => dispatch(actions.logout()) 
    }
}

export default connect(null, mapDispatchToProps)(logout);