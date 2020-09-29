import { createStore, applyMiddleware, compose } from 'redux'
import createSagaMiddleware from 'redux-saga'
import thunk from 'redux-thunk'
import { persistStore } from 'redux-persist'

import { AppState } from '../types'
import rootReducer from './reducers'
import rootSaga from './sagas'



const initState: AppState = {
  cart: {
    hidden: true,
    cartItems: [],
  },
  product: {
    adminEdit: null,
    sections: [],
    shopData: {},
    adminProductData:[],
    filteredProducts:[],
    notification:null,
  },
  ui: {
    dialogOpen: {},
    toggleSignUp: false,
    verifiedAdmin: false,
    highlightName:undefined,
    adminView: true,
  },
  user: {
    notification: null,
    isLoading: false,
    toggleNotifications: false,
    currentUser: null,
    token: undefined,
    sessionExp: undefined,
    error: null,
    adminModification:null,
    adminUsers:[],
    filteredUsers:[],
  },
}
export default function makeStore(initialState = initState) {
  const sagaMiddleware = createSagaMiddleware()
  const middlewares = [sagaMiddleware, thunk]
  let composeEnhancers = compose

  if (process.env.NODE_ENV === 'development') {
    if ((window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) {
      composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    }
  }

  const store = createStore(
    rootReducer,
    initialState,
    composeEnhancers(applyMiddleware(...middlewares))
  )

  const persistor = persistStore(store)

  sagaMiddleware.run(rootSaga)

  if ((module as any).hot) {
    ;(module as any).hot.accept('./reducers', () => {
      const nextReducer = require('./reducers').default
      store.replaceReducer(nextReducer)
    })
  }

  return { store, persistor }
}
