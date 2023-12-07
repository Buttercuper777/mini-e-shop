import { PayloadAction } from "@reduxjs/toolkit";
import { TItemId } from "../../catalog/abstract";
import { createGenericSlice } from "./genericSlice";

const initialState = [] as TItemId[];
const CartSlice = createGenericSlice("cartSlice", initialState, {
  cartMovements(state, action: PayloadAction<TItemId>) {
    if (state.includes(action.payload)) {
      const indexToRemove = state.indexOf(action.payload);
      state.splice(indexToRemove, 1);
    } else state.push(action.payload);
  },
  clearCart(state) {
    state.splice(0, state.length);
  },
});

export const { cartMovements, clearCart } = CartSlice.actions;
export default CartSlice.reducer;
