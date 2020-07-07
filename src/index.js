import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Switch, Route} from 'react-router-dom';
import {Provider} from "react-redux";
import history from './history';
import configureStore from './store';
import Shop from './components/Shop';
import Pay from './components/Pay';
import Header from './components/Header';

import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';


async function init() {
  const store = await configureStore(history);
  ReactDOM.render(
    <Provider store={store}>
      <Router history={history}>
        <div className="app">
          <Header/>
          <Switch>
            <Route exact path="/" component={Shop}/>
            <Route exact path="/pay"  component={Pay}/>
          </Switch>
        </div>
      </Router>
    </Provider>, document.getElementById('root'));
}

init();