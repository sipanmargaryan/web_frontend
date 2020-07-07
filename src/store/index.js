import {applyMiddleware, createStore} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import createLogger from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import {routerMiddleware} from 'react-router-redux';
import rootReducer from '../reducers';


export default history => {
  const middlewareHistory = routerMiddleware(history);
  const middlewares = [thunkMiddleware, createLogger, middlewareHistory];
  const store = createStore(
    rootReducer,
    {},
    composeWithDevTools(applyMiddleware(...middlewares))
  );

  return new Promise((resolve, reject) => {
    resolve(store);
  });
};
