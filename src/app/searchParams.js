import { createSlice } from "@reduxjs/toolkit";

const searchParamsSlice = createSlice({
  name: "search",
  initialState: {
    title: "",
    category: "all",
    sorting: "relevance",
  },
  reducers: {
    setTitle: (state, action) => {
      state.title = action.payload;
    },
    setCategory: (state, action) => {
      state.category = action.payload;
    },
    setSorting: (state, action) => {
      state.sorting = action.payload;
    },
  },
});

export const { setTitle, setCategory, setSorting } = searchParamsSlice.actions;
export default searchParamsSlice.reducer;
