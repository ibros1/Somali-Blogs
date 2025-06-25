import { DEFAULT_ERROR_MESSAGE } from "@/constants/error";
import { BASE_API_URL } from "@/constants/url";
import type { iGetArticlesResponse } from "@/types/posts";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

const initialState = {
  data: {} as iGetArticlesResponse,
  loading: false,
  error: " ",
};

export const getAllPostsFn = createAsyncThunk(
  "/",
  async (__, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${BASE_API_URL}/articles/list`);
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

export const getArticleSlice = createSlice({
  name: "Get Article Slice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllPostsFn.pending, (state) => {
      state.loading = true;
      state.data = {} as iGetArticlesResponse;
      state.error = "";
    });
    builder.addCase(getAllPostsFn.fulfilled, (state, action) => {
      state.data = action.payload;
      state.loading = false;
      state.error = "";
    });
    builder.addCase(getAllPostsFn.rejected, (state, action) => {
      state.error = action.payload as string;
      state.loading = false;
      state.data = {} as iGetArticlesResponse;
    });
  },
});

export default getArticleSlice.reducer;
