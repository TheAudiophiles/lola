import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';
import ReduxPromise from 'redux-promise';
// import {persistStore, autoRehydrate} from 'redux-persist'

import App from './components/App';
import Home from './containers/home/Home';
import About from './components/about/About';
import NotFound from './components/not_found/NotFound';
import Login from './components/login/Login';
import Err from './components/err/Err';

// import reducers from './reducers';
// console.log('This is reducers:', reducers);

import * as reducers from './reducers';
console.log('This is reducers:', reducers);

import './components/bundle.scss';


const createStoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore);
const store = createStoreWithMiddleware(
  combineReducers({...reducers, routing: routerReducer}),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  // autoRehydrate()
);
const history = syncHistoryWithStore(hashHistory, store);

// persistStore(store);

ReactDOM.render(
  <Provider store={store}>
    <Router onUpdate={() => window.scrollTo(0, 0)} history={history}>
      <Route path="/" component={App}>
        <IndexRoute component={Login} />
        <Route path="/home/:accessToken/:refreshToken" component={Home} />
        <Route path="/about" component={About} />
        <Route path="/error/:errorMsg" component={Err} />
        <Route path="*" component={NotFound} />
      </Route>
    </Router>
  </Provider>
  , document.getElementById('react-root'));
