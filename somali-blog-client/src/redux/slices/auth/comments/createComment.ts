import { DEFAULT_ERROR_MESSAGE } from "@/constants/error";
import { BASE_API_URL } from "@/constants/url";
import type { RootState } from "@/redux/store";

import type {
  iCreateCommentPayload,
  iCreatedCommentBodyResponse,
} from "@/types/comments";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

const initialState = {
  data: {} as iCreatedCommentBodyResponse,
  loading: false,
  error: "",
};

export const createCommentFn = createAsyncThunk(
  "/comment/create",
  async (data: iCreateCommentPayload, { rejectWithValue, getState }) => {
    const stateData = getState() as RootState;
    const token = stateData.loginSlice.data?.token;
    try {
      const response = await axios.post(
        `${BASE_API_URL}/comment/create`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data;
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

export const createCommentSlice = createSlice({
  name: "Create comment slice",
  initialState,
  reducers: {
    resetCommentFn: (state) => {
      state.data = {} as iCreatedCommentBodyResponse;
      (state.loading = false), (state.error = "");
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createCommentFn.pending, (state) => {
      state.loading = true;
      state.data = {} as iCreatedCommentBodyResponse;
      state.error = "";
    });
    builder.addCase(createCommentFn.fulfilled, (state, action) => {
      state.data = action.payload;
      state.loading = false;
      state.error = "";
    });
    builder.addCase(createCommentFn.rejected, (state, action) => {
      state.loading = false;
      state.data = {} as iCreatedCommentBodyResponse;
      state.error = action.payload as string;
    });
  },
});

export const { resetCommentFn } = createCommentSlice.actions;
