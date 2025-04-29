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
    console.log("order Data in thunk crete order", orderData);
    const { data } = await api.post("/api/shopping/orders", orderData);
    console.log(data);
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
      .addCase(createNewOrder.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(createNewOrder.rejected, (state) => {
        state.isLoading = false;
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
