import {
	MENU_CREATE_FAIL,
	MENU_CREATE_REQUEST,
	MENU_CREATE_SUCCESS,
	MENU_DELETE_FAIL,
	MENU_DELETE_REQUEST,
	MENU_DELETE_SUCCESS,
	MENU_DETAILS_FAIL,
	MENU_DETAILS_REQUEST,
	MENU_DETAILS_SUCCESS,
	MENU_LIST_FAIL,
	MENU_LIST_REQUEST,
	MENU_LIST_SUCCESS,
	MENU_UPDATE_FAIL,
	MENU_UPDATE_REQUEST,
	MENU_UPDATE_SUCCESS,
} from "../constants/menuConstants";
import axios from "axios";

export const listAllMenuItems = () => async (dispatch) => {
	try {
		dispatch({ type: MENU_LIST_REQUEST });
		const { data } = await axios.get("/api/menus");
		if (data) {
			dispatch({ type: MENU_LIST_SUCCESS, payload: data });
		}
	} catch (error) {
		dispatch({
			type: MENU_LIST_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

export const menuItemDetails = (id) => async (dispatch) => {
	try {
		dispatch({ type: MENU_DETAILS_REQUEST });
		const { data } = await axios.get(`/api/menus/${id}`);
		if (data) {
			dispatch({ type: MENU_DETAILS_SUCCESS, payload: data });
		}
	} catch (error) {
		dispatch({
			type: MENU_DETAILS_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

export const createMenuItem = (name, size, price, file) => async (dispatch, getState) => {
	try {
		dispatch({ type: MENU_CREATE_REQUEST });
		const { userLogin } = getState();
		const { userInfo } = userLogin;
		let formData = new FormData();
		formData.append("name", name);
		formData.append("size", size);
		formData.append("image", file);
		formData.append("price", price);

		const config = {
			headers: {
				"Content-Type": "multipart/form-data",
				Authorization: `Bearer ${userInfo.token}`,
			},
		};
		const { data } = await axios.post("/api/menus", formData, config);
		dispatch({
			type: MENU_CREATE_SUCCESS,
			payload: data,
		});
	} catch (error) {
		dispatch({
			type: MENU_CREATE_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

export const updateMenuItem =
	(id, { name, size, price, file }) =>
	async (dispatch, getState) => {
		try {
			dispatch({ type: MENU_UPDATE_REQUEST });
			const { userLogin } = getState();
			const { userInfo } = userLogin;
			let formData = new FormData();
			formData.append("name", name);
			formData.append("size", size);
			formData.append("image", file);
			formData.append("price", price);
			const config = {
				headers: {
					"Content-Type": "multipart/form-data",
					Authorization: `Bearer ${userInfo.token}`,
				},
			};
			const { data } = await axios.put(`/api/menus/${id}`, formData, config);
			dispatch({
				type: MENU_UPDATE_SUCCESS,
				payload: data,
			});
		} catch (error) {
			dispatch({
				type: MENU_UPDATE_FAIL,
				payload:
					error.response && error.response.data.message
						? error.response.data.message
						: error.message,
			});
		}
	};

export const deleteMenuItem = (id) => async (dispatch, getState) => {
	try {
		dispatch({ type: MENU_DELETE_REQUEST });
		const { userLogin } = getState();
		const { userInfo } = userLogin;
		const config = {
			headers: {
				Authorization: `Bearer ${userInfo.token}`,
			},
		};
		const { data } = await axios.delete(`/api/menus/${id}`, config);
		dispatch({
			type: MENU_DELETE_SUCCESS,
			payload: data,
		});
	} catch (error) {
		dispatch({
			type: MENU_DELETE_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};
