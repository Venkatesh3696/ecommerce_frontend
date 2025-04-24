import api from "@/config/api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  currentOrder: null,
  orders: [],
};

export const createNewOrder = createAsyncThunk(
  "/order/createNewOrder",
  async (orderData) => {
    const { data } = await api.post("/api/shopping/orders", orderData);
    return data;
  }
);

export const fetchAllOrdersForShoppingUser = createAsyncThunk(
  "/order/fetchAllOrders",
  async (orderData) => {
    const { data } = await api.get("/api/shopping/orders", orderData);
    return data;
  }
);

const shoppingOrderSlice = createSlice({
  name: "shoppingOrderSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createNewOrder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createNewOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.order = action.payload.order;
      })
      .addCase(createNewOrder.rejected, (state) => {
        state.isLoading = false;
        state.order = null;
      })
      .addCase(fetchAllOrdersForShoppingUser.pending, (state) => {
        state.isLoading = true;
        state.orders = [];
      })
      .addCase(fetchAllOrdersForShoppingUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orders = action.payload.orders;
      })
      .addCase(fetchAllOrdersForShoppingUser.rejected, (state) => {
        state.isLoading = false;
        state.orders = [];
      });
  },
});

export default shoppingOrderSlice.reducer;
