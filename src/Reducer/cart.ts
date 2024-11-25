import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CartState {
  cart: Array;
}

const initialState: CartState = {
  cart:[]
};

const CartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    saveCart: (state, action: PayloadAction<any[]>) => {
      state.cart = action.payload;
    },
  },
});

export const { saveCart } = CartSlice.actions;

export default CartSlice.reducer;
