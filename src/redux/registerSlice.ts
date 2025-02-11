import { createSlice } from "@reduxjs/toolkit";
// import convertToDateFormat from "utils/convertToDateFormat";

const initialState = {
  name: null,
  email: null,
  password: null,
};

const registerSlice = createSlice({
  name: "register",
  initialState,
  reducers: {
    updateFormdata(state, action) {
      const values = action.payload;
      let newState = { ...state };
      Object.assign(newState, values);
      return newState;
    },
    clearFormData(state) {
      let newState = { ...state };
      newState.name = null;
      newState.email = null;
      
      newState.password = null;
    
      return newState;
    },
  },
});

export const { updateFormdata, clearFormData } = registerSlice.actions;
export default registerSlice.reducer;