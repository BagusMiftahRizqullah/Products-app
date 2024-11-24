import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../Reducer/counterSlice';
import productReducer from '../Reducer/products';

const store = configureStore({
  reducer: {
    counter: counterReducer,
    productReducer:productReducer
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
