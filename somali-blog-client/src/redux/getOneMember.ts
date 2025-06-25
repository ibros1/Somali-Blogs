import { DEFAULT_ERROR_MESSAGE } from "@/constants/error";
import { BASE_API_URL } from "@/constants/url";
import type { iFetchedOneMember } from "@/types/members";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

const initialState = {
  data: {} as iFetchedOneMember,
  loading: false,
  error: "",
};

export const getOneMembersFn = createAsyncThunk(
  "/members",
  async (userId: number, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${BASE_API_URL}/articles/users/${userId}`);
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

export const getOneMembersSlice = createSlice({
  name: "Get One membersSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getOneMembersFn.pending, (state) => {
      state.loading = true;
      state.data = {} as iFetchedOneMember;
      state.error = "";
    });
    builder.addCase(getOneMembersFn.fulfilled, (state, action) => {
      state.data = action.payload;
      state.loading = false;
      state.error = "";
    });
    builder.addCase(getOneMembersFn.rejected, (state, action) => {
      state.data = {} as iFetchedOneMember;
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});
