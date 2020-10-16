import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './Routes';
import ProviderHeader from './context/contextHeader';
import Provider from './context/contextMain';
import { ToastProvider } from 'react-toast-notifications'
import 'bootstrap/dist/css/bootstrap.min.css';
ReactDOM.render(
  <Provider>
    <ProviderHeader>
      <ToastProvider
        autoDismiss
        autoDismissTimeout={4000}
        placement="top-right">
        <Routes />
      </ToastProvider>
    </ProviderHeader>
  </Provider>,
  document.getElementById('root')
);

