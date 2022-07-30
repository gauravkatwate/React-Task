import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import cogotoast from "cogo-toast";
import * as api from "../api";
export const login = createAsyncThunk(
  "auth/login",
  async ({ formValue, navigate }, { rejectWithValue }) => {
    try {
      const response = await api.signIn(formValue);
      cogotoast.success("Login Successfully");
      navigate("/Home");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const ragister = createAsyncThunk(
  "auth/ragister",
  async ({ formValue, navigate }, { rejectWithValue }) => {
    try {
      const response = await api.signUp(formValue);
      cogotoast.success("Ragister Successfully");
      navigate("/");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    error: "",
    loading: false,
  },
  extraReducers: {
    [login.pending]: (state, action) => {
      state.loading = true;
    },
    [login.fulfilled]: (state, action) => {
      state.loading = false;
      localStorage.setItem("profile", JSON.stringify({ ...action.payload }));
      state.user = action.payload;
    },
    [login.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [ragister.pending]: (state, action) => {
      state.loading = true;
    },
    [ragister.fulfilled]: (state, action) => {
      state.loading = false;
      localStorage.setItem("profile", JSON.stringify({ ...action.payload }));
      state.user = action.payload;
    },
    [ragister.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
  },
});

export default authSlice.reducer;
