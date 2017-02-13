import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import ReduxPromise from 'redux-promise';

import App from './components/App';
import Home from './components/home/Home';
import About from './components/about/About';
import NotFound from './components/not_found/NotFound';

import reducers from './reducers';

import './components/bundle.scss';

const createStoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore);
const store = createStoreWithMiddleware(reducers);

ReactDOM.render(
  <Provider store={store}>
    <Router onUpdate={() => window.scrollTo(0, 0)} history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={Home} />
        <Route path="about" component={About} />
        <Route path="*" component={NotFound} />
      </Route>
    </Router>
  </Provider>
  , document.getElementById('react-root'));
