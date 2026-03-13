import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

export interface Product {
    id: number;
    name: string;
    category: string | null;
    price: number;
    stock_quantity: number;
}

interface ProductState {
    products: Product[];
    loading: boolean;
    error: string | null
}

const initialState: ProductState = {
    products: [],
    loading: false,
    error: null
}

const API_URL = 'http://localhost:3000/products';

export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
    const response = await axios.get<Product[]>(API_URL);
    return response.data;
})

const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchProducts.fulfilled, (state, action: PayloadAction<Product[]>) => {
                state.products = action.payload;
                state.loading = false;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.error = action.error.message || 'failed to fetch products'
                state.loading = false;
            })
    }
});

export default productSlice.reducer;