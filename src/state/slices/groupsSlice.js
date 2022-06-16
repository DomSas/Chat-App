import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

export const groupsSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addGroups: (state, action) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { addGroups } = groupsSlice.actions;
export default groupsSlice.reducer;

