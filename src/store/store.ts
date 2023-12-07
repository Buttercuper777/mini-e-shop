import { configureStore } from "@reduxjs/toolkit";
import CartReducer from "./slices/cartSlice";

const store = configureStore({
  devTools: true,
  reducer: {
    cart: CartReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
