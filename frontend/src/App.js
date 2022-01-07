import { BrowserRouter, Route } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import AdminOrderScreen from "./screens/AdminOrderScreen";
import CartScreen from "./screens/CartScreen";
import ConfirmOrderScreen from "./screens/ConfirmOrderScreen";
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import MenuCreateScreen from "./screens/MenuCreateScreen";
import MenuEditScreen from "./screens/MenuEditScreen";
import MenuListScreen from "./screens/MenuListScreen";
import OrdersScreen from "./screens/OrdersScreen";
import ProfileScreen from "./screens/ProfileScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ShippingDetailScreen from "./screens/ShippingDetailScreen";
import SingleOrderScreen from "./screens/SingleOrderScreen";
import UserEditScreen from "./screens/UserEditScreen";
import UserListScreen from "./screens/UserListScreen";

const App = () => {
	return (
		<BrowserRouter>
			<Header />
			<main>
				<Route exact path='/' component={HomeScreen} />
				<Route path='/login' component={LoginScreen} />
				<Route path='/register' component={RegisterScreen} />
				<Route path='/cart' component={CartScreen} />
				<Route path='/profile' component={ProfileScreen} />
				<Route path='/shipping-detail' component={ShippingDetailScreen} />
				<Route path='/order-confirm' component={ConfirmOrderScreen} />
				<Route path='/orders' component={OrdersScreen} />
				<Route path='/order/:id' component={SingleOrderScreen} />

				<Route path='/admin/menulist' component={MenuListScreen} />
				<Route path='/admin/menu/new' component={MenuCreateScreen} />
				<Route path='/admin/menu/edit/:id' component={MenuEditScreen} />
				<Route path='/admin/userlist' component={UserListScreen} />
				<Route path='/admin/user/edit/:id' component={UserEditScreen} />
				<Route path='/admin/orders' component={AdminOrderScreen} />
			</main>
			<Footer />
		</BrowserRouter>
	);
};

export default App;
