import { DEFAULT_ERROR_MESSAGE } from "@/constants/error";
import { BASE_API_URL } from "@/constants/url";
import type { iArticleDetailResponse } from "@/types/posts";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

const initialState = {
  posts: {} as iArticleDetailResponse,
  loading: false,
  error: "",
};

export const getOneArticleFn = createAsyncThunk(
  "/articles/:articleId",
  async (articleId: number, { rejectWithValue }) => {
    try {
      const respone = await axios.get(`${BASE_API_URL}/articles/${articleId}`);
      console.log(respone.data);
      return respone.data;
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

export const getArticleDetailSlice = createSlice({
  name: "get article detail slice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getOneArticleFn.pending, (state) => {
      state.loading = true;
      state.posts = {} as iArticleDetailResponse;
      state.error = "";
    });
    builder.addCase(getOneArticleFn.fulfilled, (state, action) => {
      state.posts = action.payload;
      state.loading = false;
      state.error = "";
    });
    builder.addCase(getOneArticleFn.rejected, (state, action) => {
      state.posts = {} as iArticleDetailResponse;
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});
