import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { compose, createStore, applyMiddleware, combineReducers } from 'redux';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';
import 'babel-polyfill';
import createSagaMiddleware from 'redux-saga';
import persistState from 'redux-localstorage';

import * as reducers from './reducers';
import rootSaga from './sagas';

import App from './components/App';
import Home from './components/home/Home';
import About from './components/about/About';
import NotFound from './components/not_found/NotFound';
import Login from './components/login/Login';
import Err from './components/err/Err';
import User from './containers/user/User';
import CheckAuth from './containers/checkAuth/CheckAuth';

import './components/bundle.scss';

const sagaMiddleware = createSagaMiddleware();

// const createStoreWithMiddleware = applyMiddleware(
//   sagaMiddleware
// )(createStore);
//
// const enhancer = compose(persistState());
//
// const middleware = [];
//
//
// const store = createStoreWithMiddleware(
//   combineReducers({ ...reducers, routing: routerReducer }),
//   window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
//   enhancer
// );

const createStoreWithMiddleware = applyMiddleware(
  sagaMiddleware
)(createStore);

const ehancer = compose(persistState());

const store = createStoreWithMiddleware(
  combineReducers({ ...reducers, routing: routerReducer }),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  ehancer
);

const history = syncHistoryWithStore(hashHistory, store);

sagaMiddleware.run(rootSaga);

ReactDOM.render(
  <Provider store={store}>
    <Router onUpdate={() => window.scrollTo(0, 0)} history={history}>
      <Route path="/" component={App}>
        <IndexRoute component={Login} />
        <Route path="/about" component={About} />
        <Route path="/error/:errorMsg" component={Err} />
        <Route path="/user/:accessToken/:refreshToken" component={User} />
        <Route component={CheckAuth}>
          <Route path="/home" component={Home} />
        </Route>
        <Route path="*" component={NotFound} />
      </Route>
    </Router>
  </Provider>
  , document.getElementById('react-root'));
