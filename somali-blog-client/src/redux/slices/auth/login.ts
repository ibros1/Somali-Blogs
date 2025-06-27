import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { iLoginBody, iLoginResponse } from "../../../types/user";
import axios, { AxiosError } from "axios";
import { DEFAULT_ERROR_MESSAGE } from "../../../constants/error";
import { BASE_API_URL } from "../../../constants/url";

const existingUser = localStorage.getItem("userData")
  ? JSON.parse(localStorage.getItem("userData")!)
  : {};

const data = { ...existingUser };
// Removed useNavigate() hook usage from top-level scope
const initialState = {
  data: (data as iLoginResponse) || ({} as iLoginResponse),
  loading: false,
  error: "",
};

export const loginFunction = createAsyncThunk(
  "auth/login",
  async (data: iLoginBody, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_API_URL}/users/login`, data);

      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(
          error.response?.data.message ||
            error.response?.data.errors.msg ||
            DEFAULT_ERROR_MESSAGE
        );
      }
      return rejectWithValue(DEFAULT_ERROR_MESSAGE);
    }
  }
);
export const loginSlice = createSlice({
  name: "loginSlice",
  initialState,
  reducers: {
    logOut: (state) => {
      state.data = {} as iLoginResponse;
      state.loading = false;
      state.error = "";

      localStorage.removeItem("userData");
      // If you need to navigate after logout, do it in your component using useNavigate()
    },
    updateLoggedInUser: (state, action) => {
      state.data.user = {
        ...state.data.user,
        ...action.payload,
      };
      localStorage.setItem("userData", JSON.stringify(state.data));
    },
  },

  extraReducers: (builder) => {
    builder.addCase(loginFunction.pending, (state) => {
      state.loading = true;
      state.data = {} as iLoginResponse;
      state.error = "";
    });
    builder.addCase(loginFunction.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.error = "";
    });

    builder.addCase(loginFunction.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
      state.data = {} as iLoginResponse;
    });
  },
});

export const { logOut, updateLoggedInUser } = loginSlice.actions;
