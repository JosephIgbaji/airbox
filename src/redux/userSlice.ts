import { createSlice, createSelector } from "@reduxjs/toolkit";


const initialState = {
  user: null,
  token: null,
  expiration: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateUser(state, action) {
      const userObj = action.payload;
      const newState = { ...state };
      const expirationTime = new Date().getTime() + 3600 * 1000; // 1 hour from now
      userObj.expiration = expirationTime;
      Object.assign(newState, userObj);
      return newState;
    },
    logoutUser(state) {
      const newState = { ...state };
      newState.user = null;
      newState.token = null;
      newState.expiration = null;
      return newState;
    },
  },
});

// Define a selector that retrieves the user state from Redux
const selectUserState = (state) => state.user;

// Define a sub-selector that gets the id from the user state
export const selectUserId = createSelector(selectUserState, (userState) =>
  userState.user ? userState.user.id : null
);

export const { updateUser, logoutUser } = userSlice.actions;
export default userSlice.reducer;