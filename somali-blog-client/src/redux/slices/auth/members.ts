import { DEFAULT_ERROR_MESSAGE } from "@/constants/error";
import { BASE_API_URL } from "@/constants/url";
import type { iListedMembersInterface } from "@/types/members";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

const initialState = {
  data: {} as iListedMembersInterface,
  loading: false,
  error: "",
};

export const getMembersFn = createAsyncThunk(
  "/members",
  async (__, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${BASE_API_URL}/users/list`);
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

export const getMembersSlice = createSlice({
  name: "Get membersSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getMembersFn.pending, (state) => {
      state.loading = true;
      state.data = {} as iListedMembersInterface;
      state.error = "";
    });
    builder.addCase(getMembersFn.fulfilled, (state, action) => {
      state.data = action.payload;
      state.loading = false;
      state.error = "";
    });
    builder.addCase(getMembersFn.rejected, (state, action) => {
      state.data = {} as iListedMembersInterface;
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});
