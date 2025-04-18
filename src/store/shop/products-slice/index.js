import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "@/config/api";

const initialState = {
  isLoading: false,
  productsList: [],
  productDetails: null,
};

export const fetchAllFilteredProducts = createAsyncThunk(
  "products/fetchallfilteredproducts",
  async ({ filterParams, sortParams }) => {
    try {
      const query = new URLSearchParams({
        ...filterParams,
        sortBy: sortParams,
      });

      const result = await api.get(
        `/api/shopping/products/?${query.toString()}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      return result.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const fetchProductDetails = createAsyncThunk(
  "products/fetchProductDetails",
  async (id) => {
    try {
      const result = await api.get(`/api/shopping/products/${id}`, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      return result.data;
    } catch (error) {
      console.log(error);
    }
  }
);

const shoppingProductSlice = createSlice({
  name: "shopingProducts",
  initialState,
  reducers: {
    setProductDetails: (state) => {
      state.productDetails = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllFilteredProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllFilteredProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.productsList = action.payload.data;
      })
      .addCase(fetchAllFilteredProducts.rejected, (state) => {
        state.isLoading = false;
        state.productsList = [];
      })
      .addCase(fetchProductDetails.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchProductDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.productDetails = action.payload.data;
      })
      .addCase(fetchProductDetails.rejected, (state) => {
        state.isLoading = false;
        state.productDetails = null;
      });
  },
});

export const { setProductDetails } = shoppingProductSlice.actions;

export default shoppingProductSlice.reducer;
