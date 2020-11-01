import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

import App from './App';
import * as serviceWorker from './serviceWorker';
import makeStore from './redux/store';
import { PersistGate } from 'redux-persist/integration/react';

import { SnackbarProvider } from 'notistack';

const { store, persistor } = makeStore();

const WithProvider = () => (
  /*  const { token } = useSelector((state: AppState) => state.user);
  token && (axios.defaults.headers.common['Authorization'] = `Bearer ${token}`); */

  <Provider store={store}>
    <App />
  </Provider>
);

ReactDOM.render(<WithProvider />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
