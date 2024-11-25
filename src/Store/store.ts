import { configureStore } from '@reduxjs/toolkit';
import productReducer from '../Reducer/products';
import cartReducer from '../Reducer/cart';

const store = configureStore({
  reducer: {
    cartReducer:cartReducer,
    productReducer:productReducer
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
