import {createStore, applyMiddleware} from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './src/redux/index-reducer';

import createSagaMiddleware from 'redux-saga';
import IndexSagas from './src/redux/index-sagas';


// import rootSaga from './root-saga';
// const sagaMiddleware = createSagaMiddleware()
// export default createStore(rootReducer, composeWithDevTools(), applyMiddleware(sagaMiddleware));
// export default createStore(
//      rootReducer,
//      composeWithDevTools(applyMiddleware(sagaMiddleware))
//     );
// ------------------last config, withoutPersist---------------

import { persistStore, persistReducer } from 'redux-persist'
const storage = require('redux-persist/lib/storage').default;

const sagaMiddleware = createSagaMiddleware()

const persistConfig = {
     key: "root",
     whitelist: ['userReducer', 'clientReducer', 'adminUserReducer'],
     storage,
     }

const persistedReducer = persistReducer(persistConfig, rootReducer)


// export default createStore(rootReducer, composeWithDevTools(), applyMiddleware(sagaMiddleware));
const store = () =>{
     let store = createStore(
                    persistedReducer,
                    composeWithDevTools(applyMiddleware(sagaMiddleware))
                 ); 
     sagaMiddleware.run(IndexSagas);
     let persistor = persistStore(store)
     return { store, persistor }
} 

export default store;