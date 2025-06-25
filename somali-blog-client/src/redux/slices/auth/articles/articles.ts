import { DEFAULT_ERROR_MESSAGE } from "@/constants/error";
import { BASE_API_URL } from "@/constants/url";
import type { iArticleResponse, iCreatedArticlePayload } from "@/types/posts";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

const initialState = {
  posts: {} as iArticleResponse,
  loading: false,
  error: "",
};

export const createArticleFn = createAsyncThunk(
  "/article/create",
  async (data: iCreatedArticlePayload, { rejectWithValue, getState }) => {
    // Define RootState type or import it from your store if already defined
    // import type { RootState } from "@/redux/store";
    type RootState = {
      loginSlice?: {
        data?: {
          token?: string;
        };
      };
    };

    const stateData: RootState = getState() as RootState;
    const token = stateData?.loginSlice?.data?.token;
    console.log(token);
    try {
      const res = await axios.post(`${BASE_API_URL}/articles/new`, data, {
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

export const articleSlice = createSlice({
  name: "article slice",
  initialState,
  reducers: {
    resetCreateArticle: (state) => {
      state.error = "";
      state.posts = {} as iArticleResponse;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createArticleFn.pending, (state) => {
      state.loading = true;
      state.posts = {} as iArticleResponse;
      state.error = "";
    });

    builder.addCase(createArticleFn.fulfilled, (state, action) => {
      state.posts = action.payload;
      state.loading = false;
      state.error = "";
    });
    builder.addCase(createArticleFn.rejected, (state, action) => {
      state.posts = {} as iArticleResponse;
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});

export const { resetCreateArticle } = articleSlice.actions;
