import {
	MENU_LIST_FAIL,
	MENU_LIST_REQUEST,
	MENU_LIST_SUCCESS,
	MENU_CREATE_FAIL,
	MENU_CREATE_REQUEST,
	MENU_CREATE_SUCCESS,
	MENU_CREATE_RESET,
	MENU_DELETE_FAIL,
	MENU_DELETE_REQUEST,
	MENU_DELETE_SUCCESS,
	MENU_DETAILS_FAIL,
	MENU_DETAILS_REQUEST,
	MENU_DETAILS_SUCCESS,
	MENU_UPDATE_FAIL,
	MENU_UPDATE_REQUEST,
	MENU_UPDATE_SUCCESS,
	MENU_UPDATE_RESET,
	MENU_DETAILS_RESET,
} from "../constants/menuConstants";

export const menuListReducer = (state = { menuItems: [] }, action) => {
	switch (action.type) {
		case MENU_LIST_REQUEST:
			return { loading: true, menuItems: [] };
		case MENU_LIST_SUCCESS:
			return {
				loading: false,
				menuItems: action.payload.menuItems,
			};
		case MENU_LIST_FAIL:
			return {
				loading: false,
				error: action.payload,
			};
		default:
			return state;
	}
};

export const menuDetailsReducer = (state = { menu: {} }, action) => {
	switch (action.type) {
		case MENU_DETAILS_REQUEST:
			return { ...state, loading: true };
		case MENU_DETAILS_SUCCESS:
			return { loading: false, menu: action.payload };
		case MENU_DETAILS_FAIL:
			return { loading: false, error: action.payload };
		case MENU_DETAILS_RESET:
			return { menu: {} };
		default:
			return state;
	}
};

export const menuCreateReducer = (state = {}, action) => {
	switch (action.type) {
		case MENU_CREATE_REQUEST:
			return { loading: true };
		case MENU_CREATE_SUCCESS:
			return { loading: false, success: true, menu: action.payload };
		case MENU_CREATE_FAIL:
			return { loading: false, error: action.payload };
		case MENU_CREATE_RESET:
			return {};
		default:
			return state;
	}
};

export const menuUpdateReducer = (state = { menu: {} }, action) => {
	switch (action.type) {
		case MENU_UPDATE_REQUEST:
			return { loading: true };
		case MENU_UPDATE_SUCCESS:
			return { loading: false, success: true, menu: action.payload };
		case MENU_UPDATE_FAIL:
			return { loading: false, error: action.payload };
		case MENU_UPDATE_RESET:
			return {};
		default:
			return state;
	}
};

export const menuDeleteReducer = (state = {}, action) => {
	switch (action.type) {
		case MENU_DELETE_REQUEST:
			return { loading: true };
		case MENU_DELETE_SUCCESS:
			return { loading: false, success: true };
		case MENU_DELETE_FAIL:
			return { loading: false, error: action.payload };
		default:
			return state;
	}
};
