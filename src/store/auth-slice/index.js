import { API_URL } from '@/config/index.js';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
	isAuthenticated: false,
	isLoading: true,
	user: null,
};

export const registerUser = createAsyncThunk(
	'/auth/register',
	async (formData) => {
		const response = await axios.post(
			`${API_URL}/api/auth/register`,
			formData,
			{
				withCredentials: true,
			},
		);

		return response.data;
	},
);

export const loginUser = createAsyncThunk('/auth/login', async (formData) => {
	const response = await axios.post(`${API_URL}/api/auth/login`, formData, {
		withCredentials: true,
	});

	return response.data;
});

export const checkAuth = createAsyncThunk('/auth/checkauth', async () => {
	console.log('dispatched!');
	const response = await axios.get(`${API_URL}/api/auth/check-auth`, {
		withCredentials: true,
		headers: {
			'Cache-Control':
				'no-store, no-cache, must-revalidate, proxy-revalidate',
		},
	});

	return response.data;
});

export const logoutUser = createAsyncThunk('/auth/logout', async () => {
	const response = await axios.post(
		'http://localhost:5000/api/auth/logout',
		{},
		{
			withCredentials: true,
		},
	);
	return response.data;
});

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setUser: (state, action) => {},
	},
	extraReducers: (builder) => {
		builder
			.addCase(registerUser.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(registerUser.fulfilled, (state, action) => {
				state.isLoading = false;
				state.user = null;
				state.isAuthenticated = false;
			})
			.addCase(registerUser.rejected, (state, action) => {
				state.isLoading = false;
				state.isAuthenticated = false;
				state.user = null;
			})
			.addCase(loginUser.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(loginUser.fulfilled, (state, action) => {
				state.isLoading = false;
				state.user = action.payload.success
					? action.payload.user
					: null;
				state.isAuthenticated = action.payload.success;
			})
			.addCase(loginUser.rejected, (state, action) => {
				console.log('rejected action hre ==>> ', action);
				state.isLoading = false;
				state.isAuthenticated = false;
				state.user = null;
			})
			.addCase(checkAuth.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(checkAuth.fulfilled, (state, action) => {
				state.isLoading = false;
				state.user = action.payload.success
					? action.payload.user
					: null;
				state.isAuthenticated = action.payload.success;
			})
			.addCase(checkAuth.rejected, (state, action) => {
				console.log('rejected action hre ==>> ', action);
				state.isLoading = false;
				state.isAuthenticated = false;
				state.user = null;
			})
			.addCase(logoutUser.fulfilled, (state) => {
				state.isLoading = false;
				state.user = null;
				state.isAuthenticated = false;
			});
	},
});

export const { setUser } = authSlice.actions;

export default authSlice.reducer;