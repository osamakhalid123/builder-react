import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { API_HOST } from "../../../api/index";
import axios from "axios";

const initialState = {
  loading: false,
  users: [],
  error: "",
  createUserLoading: false,
  createUserError: "",
};

export const fetchUsers = createAsyncThunk("users/fetch", async () => {
  const response = await axios.get(`${API_HOST}users/`);
  const data = await response.data;
  return data;
});

export const createUser = createAsyncThunk("users/craete", async (userInfo) => {
  const response = await axios.post(`${API_HOST}users/`, userInfo);
  const data = response.data;
  return data;
});

export const updateUser = createAsyncThunk(
  "users/update",
  async (updateInfo) => {
    const response = await axios.patch(
      `${API_HOST}users/${updateInfo[0]}`,
      updateInfo[1]
    );
    const data = response.data;
    return data;
  }
);

const userSlice = createSlice({
  name: "users",
  initialState,
  extraReducers: (builder) => {
    //GET
    builder.addCase(fetchUsers.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.loading = false;
      state.users = action.payload;
      state.error = "";
    });
    builder.addCase(fetchUsers.rejected, (state, action) => {
      state.loading = false;
      state.users = [];
      state.error = action.payload;
    });

    //POST
    builder.addCase(createUser.pending, (state) => {
      state.createUserLoading = true;
    });
    builder.addCase(createUser.fulfilled, (state, action) => {
      state.createUserLoading = false;
      state.users.push(action.payload);
      state.createUserError = "";
    });
    builder.addCase(createUser.rejected, (state, action) => {
      state.createUserLoading = false;
      state.createUserError = action.payload;
    });
  },
});

export default userSlice.reducer;
