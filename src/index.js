import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import { configureStore, combineReducers} from '@reduxjs/toolkit'
import burgerBuilderReducer from './store/reducer/burgerBuilder';
import orderReducer from './store/reducer/order';
import authReducer from './store/reducer/auth'
import thunk from "redux-thunk";


const rootReducer = combineReducers({
  burgerBuilder : burgerBuilderReducer,
  order : orderReducer,
  auth: authReducer
})

const store = configureStore({
  reducer: rootReducer, // Use an object with the "reducer" key
  middleware: [thunk], // Enabling middleware to use async javascript
  devTools: true, // Enable Redux DevTools extension
});


// BrowserRouter is used for routing of the complete App
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter><App /></BrowserRouter>
    </Provider>
  </React.StrictMode>
);

