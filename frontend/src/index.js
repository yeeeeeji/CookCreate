import React from 'react';
import ReactDOM from 'react-dom/client';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux'; // react-redux에서 Provider를 가져옵니다.
import logger from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './reducers';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

const enhancer =
  process.env.NODE_ENV === 'production'
    ? compose(applyMiddleware())
    : composeWithDevTools(applyMiddleware(logger));

const store = createStore(rootReducer, enhancer);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
