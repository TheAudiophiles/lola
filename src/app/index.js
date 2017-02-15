import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';
import ReduxPromise from 'redux-promise';
import { combineReducers } from 'redux';


import App from './components/App';
import Home from './containers/home/Home';
import About from './components/about/About';
import NotFound from './components/not_found/NotFound';
import Login from './components/login/Login';

// import reducers from './reducers';
// console.log('This is reducers:', reducers);

import * as reducers from './reducers';
console.log('This is reducers:', reducers);

import './components/bundle.scss';


const createStoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore);
const store = createStoreWithMiddleware(
  combineReducers({...reducers, routing: routerReducer}),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
const history = syncHistoryWithStore(hashHistory, store);

ReactDOM.render(
  <Provider store={store}>
    <Router onUpdate={() => window.scrollTo(0, 0)} history={history}>
      <Route path="/" component={App}>
        <IndexRoute component={Login} />
        <Route path="/home/:accessToken/:refreshToken" component={Home} />
        <Route path="/about" component={About} />
        <Route path="*" component={NotFound} />
      </Route>
    </Router>
  </Provider>
  , document.getElementById('react-root'));
