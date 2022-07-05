import { configureStore } from "@reduxjs/toolkit";
import booksReducer from "./bookReducer";
import loadReducer from "./loadReducer";
import searchParamsReducer from "./searchParams";
import errorReducer from "./errorReducer";

export const store = configureStore({
  reducer: {
    books: booksReducer,
    loading: loadReducer,
    search: searchParamsReducer,
    error: errorReducer,
  },
});
