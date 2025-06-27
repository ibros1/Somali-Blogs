import { DEFAULT_ERROR_MESSAGE } from "@/constants/error";
import { BASE_API_URL } from "@/constants/url";

import type { iListedArticleCommentResponse } from "@/types/comments";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

const initialState = {
  data: {} as iListedArticleCommentResponse,
  loading: false,
  error: "",
};

export interface iListedArticleCommentsPayload {
  articleId: number;
  page: number;
  size: number;
}

export const listArticleCommentFn = createAsyncThunk(
  "/article/comments",
  async (data: iListedArticleCommentsPayload, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${BASE_API_URL}/comment/article/${data.articleId}?page=${data.page}&size=${data.size}`
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

export const listArticleCommentsSlice = createSlice({
  name: "Create article comments slice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(listArticleCommentFn.pending, (state) => {
      state.loading = true;
      state.data = {} as iListedArticleCommentResponse;
      state.error = "";
    });
    builder.addCase(listArticleCommentFn.fulfilled, (state, action) => {
      state.data = action.payload;
      state.loading = false;
      state.error = "";
    });
    builder.addCase(listArticleCommentFn.rejected, (state, action) => {
      state.loading = false;
      state.data = {} as iListedArticleCommentResponse;
      state.error = action.payload as string;
    });
  },
});
