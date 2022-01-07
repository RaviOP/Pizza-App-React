import axios from "axios";
import { CART_ITEM_RESET } from "../constants/cartConstants";
import {
	ORDER_CREATE_REQUEST,
	ORDER_CREATE_FAIL,
	ORDER_CREATE_SUCCESS,
	ORDER_DETAIL_REQUEST,
	ORDER_DETAIL_SUCCESS,
	ORDER_DETAIL_FAIL,
	ORDER_LIST_MY_REQUEST,
	ORDER_LIST_MY_SUCCESS,
	ORDER_LIST_MY_FAIL,
	ORDER_LIST_REQUEST,
	ORDER_LIST_SUCCESS,
	ORDER_LIST_FAIL,
	ORDER_STATUS_REQUEST,
	ORDER_STATUS_SUCCESS,
	ORDER_STATUS_FAIL,
} from "../constants/orderConstants";

export const createOrder = (order) => async (dispatch, getState) => {
	try {
		dispatch({ type: ORDER_CREATE_REQUEST });
		const { userLogin } = getState();
		const { userInfo } = userLogin;
		const config = {
			headers: {
				Authorization: `Bearer ${userInfo.token}`,
			},
		};

		const { data } = await axios.post("/api/orders", order, config);
		dispatch({ type: ORDER_CREATE_SUCCESS, payload: data });
		localStorage.removeItem("cartItems");
		dispatch({ type: CART_ITEM_RESET });
	} catch (error) {
		dispatch({
			type: ORDER_CREATE_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

export const getOrderDetails = (id) => async (dispatch, getState) => {
	try {
		dispatch({ type: ORDER_DETAIL_REQUEST });
		const { userLogin } = getState();
		const { userInfo } = userLogin;
		const config = {
			headers: {
				Authorization: `Bearer ${userInfo.token}`,
			},
		};

		const { data } = await axios.get(`/api/orders/${id}`, config);
		dispatch({ type: ORDER_DETAIL_SUCCESS, payload: data });
	} catch (error) {
		dispatch({
			type: ORDER_DETAIL_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

export const listMyOrders = () => async (dispatch, getState) => {
	try {
		dispatch({ type: ORDER_LIST_MY_REQUEST });
		const { userLogin } = getState();
		const { userInfo } = userLogin;
		const config = {
			headers: {
				Authorization: `Bearer ${userInfo.token}`,
			},
		};

		const { data } = await axios.get(`/api/orders`, config);
		dispatch({ type: ORDER_LIST_MY_SUCCESS, payload: data });
	} catch (error) {
		dispatch({
			type: ORDER_LIST_MY_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

export const listAdminOrders = () => async (dispatch, getState) => {
	try {
		dispatch({ type: ORDER_LIST_REQUEST });
		const { userLogin } = getState();
		const { userInfo } = userLogin;
		const config = {
			headers: {
				Authorization: `Bearer ${userInfo.token}`,
			},
		};

		const { data } = await axios.get(`/api/orders/admin`, config);
		dispatch({ type: ORDER_LIST_SUCCESS, payload: data });
	} catch (error) {
		dispatch({
			type: ORDER_LIST_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

export const statusUpdate = (id, status) => async (dispatch, getState) => {
	try {
		dispatch({ type: ORDER_STATUS_REQUEST });
		const { userLogin } = getState();
		const { userInfo } = userLogin;
		const config = {
			headers: {
				Authorization: `Bearer ${userInfo.token}`,
			},
		};
		const { data } = await axios.put(`/api/orders/${id}/status`, { status: status }, config);
		dispatch({ type: ORDER_STATUS_SUCCESS, payload: data });
	} catch (error) {
		dispatch({
			type: ORDER_STATUS_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};
