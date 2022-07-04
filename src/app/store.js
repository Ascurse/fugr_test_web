import { configureStore } from "@reduxjs/toolkit";
import booksReducer from "./bookReducer";
import loadReducer from "./loadReducer";
import searchParamsReducer from "./searchParams";

export const store = configureStore({
  reducer: {
    books: booksReducer,
    loading: loadReducer,
    search: searchParamsReducer,
  },
});
