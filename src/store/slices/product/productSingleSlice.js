// productSlice.js
import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import { getAxiosInstance } from "../../../api";

const initialState = {
  productDetails: [],
  favorites: [], // New state to store favorite products
  loading: false,
  isFavLoading:false,
};

export const fetchProductDetails = (productID) => async (dispatch) => {
  try {
    const api = await getAxiosInstance();
    dispatch(setLoading(true));
    const response = await api.get(`/products/${productID}`);
    // Dispatch an action to update the state with fetched product details
    dispatch(setProductDetails(response.data.product));
    setTimeout(() => {
      dispatch(setLoading(false));
    }, 1000);

    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
  }
};

export const fetchFavoriteProducts = createAsyncThunk(
  "productSingleSlice/fetchFavoriteProducts",
  async (_, { rejectWithValue }) => {
    const api = await getAxiosInstance();
    try {
      const response = await api.get("/favorites");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const addToFavorites = createAsyncThunk(
  "productSingleSlice/addToFavorites",
  async (params, { rejectWithValue }) => {
    const api = await getAxiosInstance();
    try {
      const response = await api.post(`/favorites/${params}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const removeToFavorites = createAsyncThunk(
  "productSingleSlice/removeToFavorites",
  async (params, { rejectWithValue }) => {
    const api = await getAxiosInstance();
    try {
      const response = await api.post(`/favorites/remove/${params}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const productSingleSlice = createSlice({
  name: "productSingleSlice",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setProductDetails: (state, action) => {
      state.productDetails = action.payload;
    },
    setProductFavToggle: (state, action) => {
      state.productDetails.is_favorite = action.payload;
    },
    setFavorites: (state, action) => {
      state.favorites = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addToFavorites.pending, (state) => {
        state.isFavLoading = true;
        state.error = null;
      })
      .addCase(addToFavorites.fulfilled, (state, action) => {
        state.isFavLoading = false;
        state.roles = action.payload;
      })
      .addCase(addToFavorites.rejected, (state, action) => {
        state.isFavLoading = false;
        state.error = action.payload;
      })
      .addCase(removeToFavorites.pending, (state) => {
        state.isFavLoading = true;
        state.error = null;
      })
      .addCase(removeToFavorites.fulfilled, (state, action) => {
        state.isFavLoading = false;
        state.roles = action.payload;
      })
      .addCase(removeToFavorites.rejected, (state, action) => {
        state.isFavLoading = false;
        state.error = action.payload;
      });
  },
});

export const {
  setProductDetails,
  setLoading,
  setFavorites,
  setProductFavToggle,
} = productSingleSlice.actions;

export default productSingleSlice.reducer;
