import {
	ORDER_CREATE_FAIL,
	ORDER_CREATE_REQUEST,
	ORDER_CREATE_SUCCESS,
	ORDER_DETAIL_FAIL,
	ORDER_DETAIL_REQUEST,
	ORDER_DETAIL_SUCCESS,
	ORDER_LIST_FAIL,
	ORDER_LIST_MY_FAIL,
	ORDER_LIST_MY_REQUEST,
	ORDER_LIST_MY_RESET,
	ORDER_LIST_MY_SUCCESS,
	ORDER_LIST_REQUEST,
	ORDER_LIST_RESET,
	ORDER_LIST_SUCCESS,
	ORDER_STATUS_FAIL,
	ORDER_STATUS_REQUEST,
	ORDER_STATUS_SUCCESS,
} from "../constants/orderConstants";

export const orderCreateReducer = (state = {}, action) => {
	switch (action.type) {
		case ORDER_CREATE_REQUEST:
			return { loading: true };
		case ORDER_CREATE_SUCCESS:
			return { loading: false, success: true, order: action.payload };
		case ORDER_CREATE_FAIL:
			return { loading: false, error: action.payload };
		default:
			return state;
	}
};

export const orderDetailReducer = (state = { order: {} }, action) => {
	switch (action.type) {
		case ORDER_DETAIL_REQUEST:
			return { loading: true };
		case ORDER_DETAIL_SUCCESS:
			return { loading: false, order: action.payload };
		case ORDER_DETAIL_FAIL:
			return { loading: false, error: action.payload };
		default:
			return state;
	}
};

export const orderListMyReducer = (state = { orders: [] }, action) => {
	switch (action.type) {
		case ORDER_LIST_MY_REQUEST:
			return { loading: true };
		case ORDER_LIST_MY_SUCCESS:
			return { loading: false, orders: action.payload };
		case ORDER_LIST_MY_FAIL:
			return { loading: false, error: action.payload };
		case ORDER_LIST_MY_RESET:
			return {};
		default:
			return state;
	}
};

export const orderListReducer = (state = { orders: [] }, action) => {
	switch (action.type) {
		case ORDER_LIST_REQUEST:
			return { loading: true };
		case ORDER_LIST_SUCCESS:
			return { loading: false, orders: action.payload };
		case ORDER_LIST_FAIL:
			return { loading: false, error: action.payload };
		case ORDER_LIST_RESET:
			return {};
		default:
			return state;
	}
};

export const orderStatusReducer = (state = { order: {} }, action) => {
	switch (action.type) {
		case ORDER_STATUS_REQUEST:
			return { loading: true };
		case ORDER_STATUS_SUCCESS:
			return { loading: false, order: action.payload, success: true };
		case ORDER_STATUS_FAIL:
			return { loading: false, error: action.payload };
		default:
			return state;
	}
};
