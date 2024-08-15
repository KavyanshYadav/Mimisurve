import { configureStore } from '@reduxjs/toolkit';
import counterReducer from "../slice/CounterSice"

export const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
});