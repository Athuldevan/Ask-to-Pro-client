import { createSlice } from "@reduxjs/toolkit";


interface IUser {
  _id : string;
  name : string;
  email:string;
  
  
};

interface Authstate {
  accessToken: string | null;
  user:IUser | null
}

const initialState: Authstate = {
  accessToken: null,
  user: null
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.accessToken = action.payload.accessToken;
      state.user = action.payload.user;
    },
    logout: (state) => {
      state.accessToken = null;
      state.user = null;
    },
  },
});


export const {setCredentials, logout} = authSlice.actions;
export default authSlice.reducer