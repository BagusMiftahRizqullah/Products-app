import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ProductState {
  products: Array;
}

const initialState: ProductState = {
  products:[]
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    saveProduct: (state, action: PayloadAction<any[]>) => {
      state.products = action.payload;
    },
  },
});

export const { saveProduct } = productSlice.actions;

export default productSlice.reducer;
