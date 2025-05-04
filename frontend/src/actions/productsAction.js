import axios from "axios";
import {
  productsFail,
  productsRequest,
  productsSuccess,
} from "../slices/ProductsSlice";

export const getProducts = (keyword, currentPage) => async (dispatch) => {
  try {
    let link = `/api/v1/products?page=${currentPage}`;

    if (keyword) {
      link += `&keyword=${keyword}`;
    }

    dispatch(productsRequest());

    const { data } = await axios.get(link);

    dispatch(productsSuccess(data));
  } catch (error) {
    dispatch(productsFail(error.response.data.message));
  }
};
