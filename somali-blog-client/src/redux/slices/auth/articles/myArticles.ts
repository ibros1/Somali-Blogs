import { DEFAULT_ERROR_MESSAGE } from "@/constants/error";
import { BASE_API_URL } from "@/constants/url";
import type { RootState } from "@/redux/store";
import type { iMyArticlesResponse } from "@/types/posts";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

const initialState = {
  data: {} as iMyArticlesResponse,
  loading: false,
  error: "",
};

export const getMyArticlesFn = createAsyncThunk(
  "/my-account",
  async (__, { rejectWithValue, getState }) => {
    const appState = getState() as RootState;
    const token = appState.loginSlice.data.token;
    try {
      const response = await axios.get(`${BASE_API_URL}/articles/my-articles`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(response.data);
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

export const myArticlesSlice = createSlice({
  name: "My Posts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getMyArticlesFn.pending, (state) => {
      state.loading = true;
      state.data = {} as iMyArticlesResponse;
      state.error = "";
    });
    builder.addCase(getMyArticlesFn.fulfilled, (state, action) => {
      state.data = action.payload;
      state.loading = false;
      state.error = "";
    });
    builder.addCase(getMyArticlesFn.rejected, (state, action) => {
      state.data = {} as iMyArticlesResponse;
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});
