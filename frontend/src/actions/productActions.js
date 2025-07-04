import axios from "axios";
import {
  productsFail,
  productsRequest,
  productsSuccess,
} from "../slices/ProductsSlice";

import {
  productFail,
  productRequest,
  productSuccess,
} from "../slices/ProductSlice";

export const getProducts = (category,price,keyword,rating, currentPage) => async (dispatch) => {
  try {
    let link = `/api/v1/products?page=${currentPage}`;

    if (keyword) {
      link += `&keyword=${keyword}`;
    }

    if (price) {
      link += `&price[gte]=${price[0]}&price[lte]=${price[1]}`;
    }

    if (category) {
      link += `&category=${category}`;
    }

    if (rating) {
      link += `&rating=${rating}`;
    }

    dispatch(productsRequest());

    const { data } = await axios.get(link);

    dispatch(productsSuccess(data));
  } catch (error) {
    dispatch(productsFail(error.response.data.message));
  }
};

export const getProduct = (id) => async (dispatch) => {
  try {
    dispatch(productRequest());
    const { data } = await axios.get(`/api/v1/product/${id}`);
    dispatch(productSuccess(data));
  } catch (error) {
    dispatch(productFail(error.response.data.message));
  }
};
