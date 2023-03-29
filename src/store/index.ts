import { configureStore } from "@reduxjs/toolkit";
import wordleReducer from "./wordle-slice";

const store = configureStore({
  reducer: { wordle: wordleReducer },
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
