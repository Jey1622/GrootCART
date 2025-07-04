import { createSlice } from "@reduxjs/toolkit";

const orderSlice = createSlice({
  name: "order",
  initialState: {
    orderDetails: {},
    userOrders: [],
    loading: false,
  },
  reducers: {
    createOrderRequest(state, action) {
        return {
            ...state,
            loading:true
        }
    },
    createOrderSuccess(state, action) {
        return {
            ...state,
            loading:false,
            orderDetails:action.payload.order
        }
    },
    createOrderFail(state, action) {
        return {
            ...state,
            loading:false,
            error:action.payload
        }
    },
    clearError(state,action){
        return {
            ...state,
            error:null
        }
    },
    userOrdersRequest(state, action) {
        return {
            ...state,
            loading:true
        }
    },
    userOrdersSuccess(state, action) {
        return {
            ...state,
            loading:false,
            userOrders:action.payload
        }
    },
    userOrdersFail(state, action) {
        return {
            ...state,
            loading:false,
            error:action.payload
        }
    },
  },
});

const { actions, reducer } = orderSlice;

export const {
  createOrderFail,
  createOrderRequest,
  createOrderSuccess,
  clearError,
  userOrdersFail,
  userOrdersRequest,
  userOrdersSuccess
} = actions;

export default reducer;
