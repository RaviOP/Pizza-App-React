import axios from "axios";
import {
	SHIPPING_ADDRESS_DETAIL_FAIL,
	SHIPPING_ADDRESS_DETAIL_REQUEST,
	SHIPPING_ADDRESS_DETAIL_SUCCESS,
	SHIPPING_ADDRESS_CREATE_FAIL,
	SHIPPING_ADDRESS_CREATE_REQUEST,
	SHIPPING_ADDRESS_CREATE_SUCCESS,
} from "../constants/shippingConstants";

export const getShippingDetails = () => async (dispatch, getState) => {
	try {
		dispatch({ type: SHIPPING_ADDRESS_DETAIL_REQUEST });
		const { userLogin } = getState();
		const { userInfo } = userLogin;
		const config = {
			headers: {
				Authorization: `Bearer ${userInfo.token}`,
			},
		};
		const { data } = await axios.get(`/api/shippingDetail`, config);
		dispatch({ type: SHIPPING_ADDRESS_DETAIL_SUCCESS, payload: data });
	} catch (error) {
		dispatch({
			type: SHIPPING_ADDRESS_DETAIL_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

export const createShippingDetails = (address) => async (dispatch, getState) => {
	try {
		dispatch({ type: SHIPPING_ADDRESS_CREATE_REQUEST });
		const { userLogin } = getState();
		const { userInfo } = userLogin;
		const config = {
			headers: {
				Authorization: `Bearer ${userInfo.token}`,
			},
		};
		const { data } = await axios.post(`/api/shippingDetail`, address, config);
		dispatch({ type: SHIPPING_ADDRESS_CREATE_SUCCESS, payload: data });
		dispatch({ type: SHIPPING_ADDRESS_DETAIL_SUCCESS, payload: data });
		let localAddress = { shippingAddress: data };
		localStorage.setItem("shippingAddress", JSON.stringify(localAddress));
	} catch (error) {
		dispatch({
			type: SHIPPING_ADDRESS_CREATE_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};
