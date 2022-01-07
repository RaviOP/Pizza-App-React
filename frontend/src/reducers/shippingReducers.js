import {
	SHIPPING_ADDRESS_CREATE_FAIL,
	SHIPPING_ADDRESS_CREATE_REQUEST,
	SHIPPING_ADDRESS_CREATE_RESET,
	SHIPPING_ADDRESS_CREATE_SUCCESS,
	SHIPPING_ADDRESS_DETAIL_FAIL,
	SHIPPING_ADDRESS_DETAIL_REQUEST,
	SHIPPING_ADDRESS_DETAIL_RESET,
	SHIPPING_ADDRESS_DETAIL_SUCCESS,
} from "../constants/shippingConstants";

export const shippingAddressCreateReducer = (state = {}, action) => {
	switch (action.type) {
		case SHIPPING_ADDRESS_CREATE_REQUEST:
			return { loading: true };
		case SHIPPING_ADDRESS_CREATE_SUCCESS:
			return { loading: false, shippingAddress: action.payload, success: true };
		case SHIPPING_ADDRESS_CREATE_FAIL:
			return { ...state, loading: false, error: action.payload };
		case SHIPPING_ADDRESS_CREATE_RESET:
			return {};
		default:
			return state;
	}
};

export const shippingAddressDetailReducer = (state = {}, action) => {
	switch (action.type) {
		case SHIPPING_ADDRESS_DETAIL_REQUEST:
			return { loading: true };
		case SHIPPING_ADDRESS_DETAIL_SUCCESS:
			return { loading: false, shippingAddress: action.payload };
		case SHIPPING_ADDRESS_DETAIL_FAIL:
			return { ...state, loading: false, error: action.payload };
		case SHIPPING_ADDRESS_DETAIL_RESET:
			return {};
		default:
			return state;
	}
};
