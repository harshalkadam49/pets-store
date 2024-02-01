import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "products",
  initialState: [],
  reducers: {
    addToHistory(state, action) {
      state.push(action.payload);
    },
    addToCart(state, action) {
      state.push(action.payload);
    },
  },
});

export default productSlice.reducer;
export const { addToHistory, addToCart } = productSlice.actions;
