import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import App from './App';
import reducer from './reducers';
import createSagaMiddleware from 'redux-saga';
import { applyMiddleware, createStore } from 'redux';
import { logger } from 'redux-logger';
import rootSaga from './sagas';
import Keycloak from 'keycloak-js';
import fetchIntercept from 'fetch-intercept';

const keycloak = Keycloak('/keycloak.json');
const sagaMiddleware = createSagaMiddleware();
const store = createStore(reducer, applyMiddleware(sagaMiddleware, logger));

sagaMiddleware.run(rootSaga);

keycloak.init({ onLoad: 'login-required' }).then((authenticated) => {
  if (authenticated) {
    keycloak.loadUserProfile().then(() => {
      fetchIntercept.register({
        request(url, config) {
          // Modify the url or config here
          // tslint:disable-next-line: no-console
          if (config === undefined) {
            config = {};
          }
          if (config.headers === undefined) {
            config.headers = {};
          }
          if (url.indexOf(':workspaceId') >= 0) {
            url = url.replaceAll(':workspaceId', sessionStorage.getItem('workspaceId') || ':workspaceId');
          }
          const withDefaults = {
            ...config,
            headers: {
              ...config.headers,
              AUTHORIZATION: `Bearer ${keycloak.token}`,
              workspace: sessionStorage.getItem('workspaceId'),
            },
          };
          return [url, withDefaults];
        },

        requestError(error) {
          // Called when an error occured during another 'request' interceptor call
          return Promise.reject(error);
        },

        response(response) {
          // Modify the reponse object
          return response;
        },

        responseError(error) {
          // Handle an fetch error
          return Promise.reject(error);
        },
      });

      ReactDOM.render(
        <Provider store={store}>
          <React.StrictMode>
            <App keycloak={keycloak} />
          </React.StrictMode>
        </Provider>,
        document.getElementById('root'),
      );
    });
  }
});

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
