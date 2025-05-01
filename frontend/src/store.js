import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { thunk } from "redux-thunk";
import productReducer from "./slices/ProductsSlice";

const reducer = combineReducers({
  productState: productReducer,
});

const store = configureStore({
  reducer,
});

export default store;
