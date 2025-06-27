import { DEFAULT_ERROR_MESSAGE } from "@/constants/error";
import { BASE_API_URL } from "@/constants/url";
import type { RootState } from "@/redux/store";
import type { iUpdatedUserBody, iUpdatedUserResponse } from "@/types/user";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

const initialState = {
  data: {} as iUpdatedUserResponse,
  loading: false,
  error: "",
};

export const updatedUserFn = createAsyncThunk(
  "/users/update",
  async (data: iUpdatedUserBody, { rejectWithValue, getState }) => {
    try {
      const appState = getState() as RootState;
      const token = appState.loginSlice.data.token;
      const res = await axios.put(`${BASE_API_URL}/users/update`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log(res.data);
      return res.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(
          error.response?.data.message || DEFAULT_ERROR_MESSAGE
        );
      }
      return rejectWithValue(DEFAULT_ERROR_MESSAGE);
    }
  }
);

export const updateUserSlice = createSlice({
  name: "Update User Slice",
  initialState,
  reducers: {
    resetUpdateUserFn: (state) => {
      state.data = {} as iUpdatedUserResponse;
      state.loading = false;
      state.error = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(updatedUserFn.pending, (state) => {
      (state.loading = true),
        (state.data = {} as iUpdatedUserResponse),
        (state.error = "");
    });
    builder.addCase(updatedUserFn.fulfilled, (state, action) => {
      (state.data = action.payload),
        (state.loading = false),
        (state.error = "");
    });
    builder.addCase(updatedUserFn.rejected, (state, action) => {
      (state.loading = false),
        (state.data = {} as iUpdatedUserResponse),
        (state.error = action.payload as string);
    });
  },
});

export const { resetUpdateUserFn } = updateUserSlice.actions;
