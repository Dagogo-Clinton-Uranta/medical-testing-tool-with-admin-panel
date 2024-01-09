import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import { useDispatch as useAppDispatch, useSelector as useAppSelector } from 'react-redux';
import thunk from 'redux-thunk';
import storage from './storage';
import authReducer from './reducers/auth.slice';
import patientReducer from './reducers/patient.slice';
import jobReducer from './reducers/job.slice';
import groupReducer from './reducers/group.slice';

import candidateReducer from './reducers/candidate.slice';



const reducers = combineReducers({
  jobs:jobReducer,
  auth: authReducer,
  group: groupReducer,
  candidates:candidateReducer,
  patient: patientReducer,
});

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['patient']
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: [thunk],
});


export default store;
