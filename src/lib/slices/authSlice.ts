import { createSlice } from "@reduxjs/toolkit";


interface IUser {
  _id : string;
  name : string;
  email:string;
  
  
};

interface Authstate {
  acessToken: string | null;
  user:IUser | null
}

const initialState: Authstate = {
  acessToken: null,
  user: null
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.acessToken = action.payload.acessToken;
      state.user = action.payload.user;
    },
    logout: (state) => {
      state.acessToken = null;
      state.user = null;
    },
  },
});


export const {setCredentials, logout} = authSlice.actions;
export default authSlice.reducer