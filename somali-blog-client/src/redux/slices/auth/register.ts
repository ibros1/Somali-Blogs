import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { iLoginBody, iRegisterResponse } from "../../../types/user";
import { BASE_API_URL } from "../../../constants/url";
import axios, { AxiosError } from "axios";
import { DEFAULT_ERROR_MESSAGE } from "../../../constants/error";

const initialState = {
  data: {} as iRegisterResponse,
  loading: false,
  error: "",
};

export const createUserFn = createAsyncThunk(
  "auth/register",
  async (data: iLoginBody, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_API_URL}/users/new`, data);

      console.log(response.data);
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(
          error.response?.data.message || DEFAULT_ERROR_MESSAGE
        );
      }
      interface ErrorWithResponse {
        response?: {
          data?: {
            message?: string;
          };
        };
      }
      const err = error as ErrorWithResponse;
      if (
        typeof error === "object" &&
        error !== null &&
        err.response &&
        typeof err.response === "object" &&
        err.response !== null &&
        err.response.data &&
        typeof err.response.data === "object" &&
        err.response.data !== null &&
        "message" in err.response.data
      ) {
        return rejectWithValue(
          (err.response.data.message as string) || DEFAULT_ERROR_MESSAGE
        );
      }
      return rejectWithValue(DEFAULT_ERROR_MESSAGE);
    }
  }
);

export const registerSlice = createSlice({
  name: "Register Slice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createUserFn.pending, (state) => {
      state.loading = true;
      state.data = {} as iRegisterResponse;
      state.error = "";
    });
    // fullfilled
    builder.addCase(createUserFn.fulfilled, (state, action) => {
      state.data = action.payload;
      state.loading = false;
      state.error = "";
    });
    // error
    builder.addCase(createUserFn.rejected, (state, action) => {
      state.loading = false;
      state.data = {} as iRegisterResponse;
      state.error = action.payload as string;
    });
  },
});
