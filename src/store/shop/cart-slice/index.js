import api from "@/config/api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
  isLoading: false,
  totalQuantity: 0,
  changed: false,
};

export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async ({ userId, productId, quantity }) => {
    const response = await api.post(`/api/shopping/cart`, {
      userId,
      productId,
      quantity,
    });
    console.log(response.data);
    return response.data;
  }
);

export const fetchCartItems = createAsyncThunk(
  "cart/fetchCartItems",
  async () => {
    try {
      const response = await api.get(`/api/shopping/cart`);
      return response.data;
    } catch (error) {
      console.log("error in fetching cart items in cart slice", error);
    }
  }
);

export const updateCartQuantity = createAsyncThunk(
  "cart/updateCartQuantity",
  async ({ userId, productId, quantity }) => {
    const response = await api.put(`/api/shopping/cart`, {
      userId,
      productId,
      quantity,
    });

    return response.data;
  }
);

export const deleteCartItem = createAsyncThunk(
  "cart/deleteCartItem",
  async ({ userId, productId }) => {
    console.log({ userId, productId });
    const response = await api.delete(`/api/shopping/cart`, {
      params: { userId, productId },
    });

    return response.data;
  }
);

const shopingCartSlice = createSlice({
  name: "shoppingCart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addToCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartItems = action.payload.data;
      })
      .addCase(addToCart.rejected, (state) => {
        state.isLoading = false;
        state.cartItems = [];
      })
      .addCase(fetchCartItems.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchCartItems.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartItems = action.payload.data.cart;
        state.totalQuantity = action.payload.data.cart.length;
      })
      .addCase(fetchCartItems.rejected, (state) => {
        state.totalQuantity = 0;
        state.isLoading = false;
        state.cartItems = [];
      })
      .addCase(updateCartQuantity.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateCartQuantity.fulfilled, (state) => {
        state.isLoading = true;
      })
      .addCase(updateCartQuantity.rejected, (state) => {
        state.totalQuantity = 0;
        state.isLoading = false;
        state.cartItems = [];
      })
      .addCase(deleteCartItem.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteCartItem.fulfilled, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteCartItem.rejected, (state) => {
        state.totalQuantity = 0;
        state.isLoading = false;
        state.cartItems = [];
      });
  },
});

export const { setProductDetails } = shopingCartSlice.actions;

export default shopingCartSlice.reducer;
