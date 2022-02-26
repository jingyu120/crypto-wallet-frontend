import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import axios from "axios";
export const getCryptoList = createAsyncThunk(
  "crypto/getCryptoList",
  async (dispatch, getState) => {
    return axios
      .get("https://api.coinlore.net/api/tickers/")
      .then((res) => res.data.data);
  }
);

export const cryptoSlice = createSlice({
  name: "messages",
  initialState: { balance: 0, cryptoList: [] },
  reducers: {
    setBalance: (state, action) => {
      state.balance = action.payload;
    },
    setCryptoList: (state, action) => {
      state.cryptoList = action.payload;
    },
  },
  extraReducers: {
    [getCryptoList.fulfilled]: (state, action) => {
      state.cryptoList = action.payload;
    },
  },
});

export const { setBalance, setCryptoList } = cryptoSlice.actions;
export default cryptoSlice.reducer;
