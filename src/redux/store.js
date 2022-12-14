import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import thunk from 'redux-thunk';
import storage from './storage';
import jobReducer from './reducers/job.slice';
import authReducer from './reducers/auth.slice';
import candidateReducer from './reducers/candidate.slice';

const reducers = combineReducers({
  jobs: jobReducer,
  auth: authReducer,
  candidate: candidateReducer,
});

const persistConfig = {
  key: 'root',
  storage,
  // blacklist: ['auth']
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: [thunk],
});

export default store;
