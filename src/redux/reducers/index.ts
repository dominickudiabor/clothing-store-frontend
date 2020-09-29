import { combineReducers } from 'redux';

import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import cart from './cart';
import product from './product';
import ui from './ui';
import user from './user';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['cart', 'country', 'user', 'ui','product'],
};

const createRootReducer = () =>
  combineReducers({
    cart,
    product,
    ui,
    user,
  });
const rootReducer = createRootReducer();

export default persistReducer(persistConfig, rootReducer);
