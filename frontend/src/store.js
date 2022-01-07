import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
	menuCreateReducer,
	menuDeleteReducer,
	menuDetailsReducer,
	menuListReducer,
	menuUpdateReducer,
} from "./reducers/menuReducers";
import {
	userDetailsReducer,
	userListReducer,
	userLoginReducer,
	userProfileReducer,
	userRegisterReducer,
	userUpdateProfileReducer,
	userDeleteProfileReducer,
	userDeleteReducer,
	userUpdateReducer,
} from "./reducers/userReducers";
import { cartReducer } from "./reducers/cartReducers";
import {
	shippingAddressCreateReducer,
	shippingAddressDetailReducer,
} from "./reducers/shippingReducers";
import {
	orderCreateReducer,
	orderDetailReducer,
	orderListMyReducer,
	orderListReducer,
	orderStatusReducer,
} from "./reducers/orderReducers";

const reducers = combineReducers({
	userLogin: userLoginReducer,
	userRegister: userRegisterReducer,
	userProfile: userProfileReducer,
	userUpdateProfile: userUpdateProfileReducer,
	userDeleteProfile: userDeleteProfileReducer,
	userList: userListReducer,
	userDetails: userDetailsReducer,
	userDelete: userDeleteReducer,
	userUpdate: userUpdateReducer,
	cart: cartReducer,
	menuList: menuListReducer,
	menuDetail: menuDetailsReducer,
	menuCreate: menuCreateReducer,
	menuUpdate: menuUpdateReducer,
	menuDelete: menuDeleteReducer,
	shippingDetail: shippingAddressDetailReducer,
	shippingCreate: shippingAddressCreateReducer,
	orderCreate: orderCreateReducer,
	orderDetail: orderDetailReducer,
	orderListMy: orderListMyReducer,
	orderList: orderListReducer,
	orderStatus: orderStatusReducer,
});

const cartItemsFromStorage = localStorage.getItem("cartItems")
	? JSON.parse(localStorage.getItem("cartItems"))
	: [];

const userInfoFromStorage = localStorage.getItem("user")
	? JSON.parse(localStorage.getItem("user"))
	: null;

const shippingAddressFromStorage = localStorage.getItem("shippingAddress")
	? JSON.parse(localStorage.getItem("shippingAddress"))
	: {};

const initialState = {
	userLogin: { userInfo: userInfoFromStorage },
	cart: { cartItems: cartItemsFromStorage },
	shippingDetail: shippingAddressFromStorage,
};

const middleware = [thunk];

const store = createStore(
	reducers,
	initialState,
	composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
