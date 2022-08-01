import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_HOST } from "../../../api";

const initialState = {
  loading: false,
  assets: [],
  error: "",
  uploadAssetLoading: false,
  uploadAssetError: "",
};

export const fetchAssets = createAsyncThunk("assets/fetch", async () => {
  const response = await axios.get(`${API_HOST}assets/`);
  const data = await response.data;
  return data;
});

export const uploadAsset = createAsyncThunk(
  "assets/upload",
  async (assetInfo) => {
    const response = await axios.post(`${API_HOST}assets/upload`, assetInfo);
    const data = await response.data;
    return data;
  }
);

const assetSlice = createSlice({
  name: "assets",
  initialState,
  extraReducers: (builder) => {
    //GET
    builder.addCase(fetchAssets.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(fetchAssets.fulfilled, (state, action) => {
      state.loading = false;
      state.assets = action.payload;
      state.error = "";
    });

    builder.addCase(fetchAssets.rejected, (state, action) => {
      state.loading = false;
      state.assets = [];
      state.error = action.payload;
    });

    //POST
    builder.addCase(uploadAsset.pending, (state) => {
      state.uploadAssetLoading = true;
    });

    builder.addCase(uploadAsset.fulfilled, (state, action) => {
      state.uploadAssetLoading = false;
      state.assets.push(action.payload);
      state.uploadAssetError = "";
    });

    builder.addCase(uploadAsset.rejected, (state, action) => {
      state.uploadAssetLoading = false;
      state.uploadAssetError = action.payload;
    });
  },
});

export default assetSlice.reducer;
