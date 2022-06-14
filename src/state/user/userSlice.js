import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  uid: "",
  name: "",
  gender: "",
  image: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      return { ...state, ...action.payload };
    },
    logout: () => {
      return initialState;
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;

// OLD WAY OF REDUX
// const userReducer = (state = {}, action) => {
//   switch (action.type) {
//     case "LOGIN":
//       return {
//         ...state,
//         uid: action.payload.uid,
//         name: action.payload.name,
//         gender: action.payload.gender,
//         picture: action.payload.picture,
//       };

//     case "LOGOUT":
//       return {
//         ...state,
//         uid: "",
//         name: "",
//         gender: "",
//         picture: "",
//       };

//     default:
//       return state;
//   }
// };

// export default userReducer;
