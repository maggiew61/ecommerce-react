import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch } from 'react-router-dom'
import styles from './index.module.scss';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {applyMiddleware, createStore,combineReducers,compose} from 'redux'  //combinreducer is new; map our reducers to slices of states & merge all into one global state for us
import {Provider} from 'react-redux'
import thunk from 'redux-thunk';

import { loadState, saveState } from './store/localStorage';
import authReducer from './store/reducers/auth-reducer'
import messageReducer from './store/reducers/message-reducer'
import reduxPractice from './store/reducers/reduxPractice'
import cart from './store/reducers/cart'
import product from './store/reducers/product'
const rootReducer = combineReducers({  //combine reducers here
    auth: authReducer,
    profile:reduxPractice,
    product:product,
    cart:cart,
    message:messageReducer
 })
//槓掉的是原本的, ({ trace: true})會導致github page無法顯示
// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({ trace: true}) || compose;
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// test
const persistedState = loadState();
// test
// const persistedState = localStorage.getItem('myproject-reduxState') ? JSON.parse(localStorage.getItem('myproject-reduxState')) : {}
const store = createStore(
    rootReducer, 
    persistedState,
    composeEnhancers(applyMiddleware(thunk))
);
// store.subscribe(() => {
//     localStorage.setItem('myproject-reduxState', JSON.stringify(store.getState()))
//   })  

//   test
store.subscribe(() => {
    saveState({
      cart: store.getState().cart,
      product: store.getState().product
    });
  });
// test
ReactDOM.render(
    <BrowserRouter>
        <Switch>
            <Provider store={store}>
                <App className={styles}/>
            </Provider>
        </Switch>
    </BrowserRouter>, 
document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();



