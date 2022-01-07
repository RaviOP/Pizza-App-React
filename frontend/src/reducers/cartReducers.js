import { CART_ADD_ITEM, CART_ITEM_RESET, CART_REMOVE_ITEM } from "../constants/cartConstants";

export const cartReducer = (state = { cartItems: [] }, action) => {
	switch (action.type) {
		case CART_ADD_ITEM:
			const newMenuItem = action.payload;
			const itemExist = state.cartItems.find((menuItem) => menuItem._id === newMenuItem._id);
			if (itemExist) {
				return {
					...state,
					cartItems: state.cartItems.map((menuItem) =>
						menuItem._id === itemExist._id ? newMenuItem : menuItem
					),
				};
			} else {
				return {
					...state,
					cartItems: [...state.cartItems, newMenuItem],
				};
			}
		case CART_REMOVE_ITEM:
			return {
				...state,
				cartItems: state.cartItems.filter((menuItem) => menuItem._id !== action.payload),
			};
		case CART_ITEM_RESET:
			return { cartItems: [] };
		default:
			return state;
	}
};
