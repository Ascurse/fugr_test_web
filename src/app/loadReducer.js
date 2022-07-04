import { createSlice } from "@reduxjs/toolkit";

const loadingSlice = createSlice({
  name: "loading",
  initialState: {
    isLoading: false,
    isOpen: false,
  },
  reducers: {
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setOpen: (state, action) => {
      state.isOpen = action.payload;
    },
  },
});

export const { setIsLoading, setOpen } = loadingSlice.actions;
export default loadingSlice.reducer;
