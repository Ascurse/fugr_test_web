import { createSlice } from "@reduxjs/toolkit";

const booksSlice = createSlice({
  name: "books",
  initialState: {
    bookArray: [],
    bookCount: null,
    currentPage: 0,
    currentBook: null,
  },
  reducers: {
    setBooks: (state, action) => {
      state.bookArray = action.payload;
    },
    setBookCount: (state, action) => {
      state.bookCount = action.payload;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    addMoreBooks: (state, action) => {
      state.bookArray = [...state.bookArray, ...action.payload];
    },
    setCurrentBook: (state, action) => {
      state.currentBook = action.payload;
    },
  },
});

export const {
  setBooks,
  setBookCount,
  setCurrentPage,
  addMoreBooks,
  setCurrentBook,
} = booksSlice.actions;
export default booksSlice.reducer;
