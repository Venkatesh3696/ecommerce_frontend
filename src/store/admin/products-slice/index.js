import { API_URL } from '@/config';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios, { formToJSON } from 'axios';

const initialState = {
	isLoading: false,
	productsList: [],
};

export const addNewProduct = createAsyncThunk(
	'products/addnewproduct',
	async (formData) => {
		const result = await axios.post(
			`${API_URL}/api/admin/products`,
			formData,
			{
				headers: {
					'Content-Type': 'application/json',
				},
			},
		);
		return result.data;
	},
);
export const fetchAllProducts = createAsyncThunk(
	'products/fetchallproducts',
	async () => {
		const result = await axios.get(
			`${API_URL}/api/admin/products`,

			{
				headers: {
					'Content-Type': 'application/json',
				},
			},
		);
		return result.data;
	},
);
export const editProduct = createAsyncThunk(
	'products/editproduct',
	async ({ id, formData }) => {
		const result = await axios.put(
			`${API_URL}/api/admin/products/${id}`,
			formData,
			{
				headers: {
					'Content-Type': 'application/json',
				},
			},
		);
		return result.data;
	},
);
export const deleteProduct = createAsyncThunk(
	'products/deleteproduct',
	async (id) => {
		console.log('deleting id =>', id);
		const result = await axios.delete(
			`${API_URL}/api/admin/products/${id}`,
			{
				headers: {
					'Content-Type': 'application/json',
				},
			},
		);
		return result.data;
	},
);

const adminProductsScile = createSlice({
	name: 'adminProducts',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(fetchAllProducts.pending, (state) => {
			state.isLoading = true;
		});
		builder.addCase(fetchAllProducts.fulfilled, (state, action) => {
			state.isLoading = false;
			state.productsList = action.payload.data;
		});
		builder.addCase(fetchAllProducts.rejected, (state, action) => {
			state.isLoading = false;
			state.productsList = [];
		});
	},
});

export default adminProductsScile.reducer;
