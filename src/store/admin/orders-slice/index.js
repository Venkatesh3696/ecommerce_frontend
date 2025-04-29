import api from "@/config/api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = { isLoading: false, ordersList: [] };

export const fetchAllOrdersForAdmin = createAsyncThunk(
  "/order/fetchAllOrders",
  async () => {
    const { data } = await api.get("/api/admin/orders");
    return data;
  }
);

const adminOrderSlice = createSlice({
  name: "adminOrderSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllOrdersForAdmin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllOrdersForAdmin.fulfilled, (state, action) => {
        console.log(action.payload);
        state.isLoading = false;
        state.ordersList = action.payload.orders;
      })
      .addCase(fetchAllOrdersForAdmin.rejected, (state, action) => {
        state.isLoading = false;
        state.ordersList = action.payload.orders;
      });
  },
});

export default adminOrderSlice.reducer;
