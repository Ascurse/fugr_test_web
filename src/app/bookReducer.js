import { createSlice } from "@reduxjs/toolkit";

const booksSlice = createSlice({
  name: "books",
  initialState: {
    bookArray: [],
    bookCount: null,
    currentPage: 0,
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
  },
});

export const { setBooks, setBookCount, setCurrentPage, addMoreBooks } =
  booksSlice.actions;
export default booksSlice.reducer;
