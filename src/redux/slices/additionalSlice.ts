import { createSlice } from "@reduxjs/toolkit";

interface AdditionalState {
  title: string;
}

const initialState: AdditionalState = {
  title: "",
};
export const additionalSlice = createSlice({
  name: "additional",
  initialState,
  reducers: {
    setTitle: (state, action) => {
      state.title = action.payload;
    },
  },
});

export const { setTitle } = additionalSlice.actions;

export default additionalSlice.reducer;
