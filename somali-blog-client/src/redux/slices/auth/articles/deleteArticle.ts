import { DEFAULT_ERROR_MESSAGE } from "@/constants/error";
import { BASE_API_URL } from "@/constants/url";
import type { RootState } from "@/redux/store";
import type { iDeletedArticleResponseInterface } from "@/types/posts";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

const initialState = {
  data: {} as iDeletedArticleResponseInterface,
  loading: false,
  error: "",
};

export const deleteArticleFn = createAsyncThunk(
  "/articles/delete",
  async (articleId: number, { rejectWithValue, getState }) => {
    try {
      const appState = getState() as RootState;
      const token = appState.loginSlice.data.token;
      const res = await axios.delete(
        `${BASE_API_URL}/articles/delete/${articleId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

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

export const deleteArticleSlice = createSlice({
  name: " Delete Article Slice",
  initialState,
  reducers: {
    resetDeleteArticle: (state) => {
      state.data = {} as iDeletedArticleResponseInterface;
      state.loading = false;
      state.error = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(deleteArticleFn.pending, (state) => {
      state.loading = true;
      state.data = {} as iDeletedArticleResponseInterface;
      state.error = "";
    });
    builder.addCase(deleteArticleFn.fulfilled, (state, action) => {
      state.data = action.payload;
      state.loading = false;
      state.error = "";
    });
    builder.addCase(deleteArticleFn.rejected, (state, action) => {
      state.loading = false;
      state.data = {} as iDeletedArticleResponseInterface;
      state.error = action.payload as string;
    });
  },
});

export const { resetDeleteArticle } = deleteArticleSlice.actions;
