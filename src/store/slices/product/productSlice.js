// productSlice.js
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { getAxiosInstance } from "../../../api";



const initialState = {
  products: [],
  filterOptions: [],
  sortOptions: [],
  searchQuery: "",
  selectedFilters: "",
  selectedSort: "",
  currentPage: 0,
  perPage:10,
  loading: false,
  hasMore: true,
  fullData:"",
};

export const fetchProducts = () => async (dispatch, getState) => {
  const state = getState().product;

  dispatch(setLoading(true));

  try {
    const api = await getAxiosInstance();
    const response = await api.get("/products", {
      params: {
        search: state.searchQuery,
        category: state.selectedFilters.value,
        sort: state.selectedSort.value,
        page: state.currentPage,
        perPage:state.perPage
      },
    });

    dispatch(setProducts(response.data.data));
    dispatch(setLoading(false));
    dispatch(setProductsFullData(response.data));
    
    return response.data.data;
  } catch (error) {
    console.error("Error fetching products:", error);
  }

  dispatch(setLoading(false));
};

export const fetchFilterOptions = () => async (dispatch) => {
  try {
    const api = await getAxiosInstance();
    const response = await api.get("/product-filter-options");
    dispatch(setFilterOptions(response.data.categories));
    return response.data;
  } catch (error) {
    console.error("Error fetching filter options:", error);
  }
};

export const fetchSortOptions = () => async (dispatch) => {
  try {
    const api = await getAxiosInstance();
    const response = await api.get("/product-sort-options");

    dispatch(setSortOptions(response.data.sortOptions));
    return response.data;
  } catch (error) {
    console.error("Error fetching sort options:", error);
  }
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setProducts(state, action) {
      state.products.push(...action.payload);
    },
    setPerPage(state, action) {
      state.perPage = action.payload;
    },
    setCurrentPage(state, action) {
      state.currentPage = action.payload;
    },
    setProductsFullData(state, action) {
      state.fullData = action.payload;
    },
    setFilterOptions(state, action) {
      state.filterOptions = action.payload;
    },
    setSortOptions(state, action) {
      state.sortOptions = action.payload;
    },
    setSearchQuery(state, action) {
      state.searchQuery = action.payload;
      state.currentPage = 1;
      state.products = [];
      state.hasMore = true;
    },
    setSelectedFilters(state, action) {
      state.selectedFilters = action.payload;
      state.currentPage = 1;
      state.products = [];
      state.hasMore = true;
    },
    setSelectedSort(state, action) {
      state.selectedSort = action.payload;
      state.currentPage = 1;
      state.products = [];
      state.hasMore = true;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setHasMore(state, action) {
      state.hasMore = action.payload;
    },
    incrementPage(state) {
      state.currentPage += 1;
    },
  },
});

export const {
  setProducts,
  setFilterOptions,
  setSortOptions,
  setSearchQuery,
  setSelectedFilters,
  setSelectedSort,
  setLoading,
  setHasMore,
  incrementPage,
  setProductsFullData,
  setPerPage,
  setCurrentPage
} = productSlice.actions;

export default productSlice.reducer;
