import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './rootReducer';
import rootSaga from '../sagas/rootSaga';

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: rootReducer, // Set your root reducer
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware), // Set your root reducer
});

// Set your root reducer
sagaMiddleware.run(rootSaga);

export default store;

// Define RootState based on the state shape of reducers
export type RootState = ReturnType<typeof rootReducer>;
