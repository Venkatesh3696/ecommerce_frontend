import api from "@/config/api";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  addressList: [],
};

export const addNewAddress = createAsyncThunk(
  "/addresses/addNewAddress",
  async ({ formData }) => {
    const response = await api.post("/api/shopping/address", formData);
    return response.data;
  }
);

export const fetchAddresses = createAsyncThunk(
  "/addresses/fetchAddress",
  async (addressId) => {
    const response = await api.get(`/api/shopping/address/${addressId}`);
    return response.data;
  }
);

export const fetchAllAddresses = createAsyncThunk(
  "/addresses/fetchAllAddresses",
  async () => {
    const response = await api.get("/api/shopping/address");
    console.log(response.data);
    return response.data;
  }
);

export const editAddress = createAsyncThunk(
  "/addresses/editAddress",
  async ({ id, formData }) => {
    const response = await api.put(`/api/shopping/address/${id}`, formData);

    return response.data;
  }
);

export const deleteAddress = createAsyncThunk(
  "/addresses/deleteAddress",
  async (addressId) => {
    const response = await api.delete(`/api/shopping/address/${addressId}`);
    return response.data;
  }
);

const addressSlice = createSlice({
  name: "shopAddress",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllAddresses.pending, (state) => {
        state.pending = true;
      })
      .addCase(fetchAllAddresses.fulfilled, (state, action) => {
        state.pending = false;
        state.addressList = action.payload;
      })
      .addCase(fetchAllAddresses.rejected, (state) => {
        state.pending = false;
        state.addressList = [];
      });
  },
});

export const { setAddressSlice } = addressSlice.actions;

export default addressSlice.reducer;
