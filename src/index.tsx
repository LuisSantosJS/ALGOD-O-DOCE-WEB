import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Routes from './Routes';
import Provider from './context/contextMain';
import { ToastProvider } from 'react-toast-notifications'

ReactDOM.render(
  <Provider>
    <ToastProvider
      autoDismiss
      autoDismissTimeout={4000}
      placement="top-right">
      <Routes />
    </ToastProvider>
  </Provider>,
  document.getElementById('root')
);

