import React from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Toaster, toast } from "react-hot-toast";
import { Image } from "react-bootstrap";
import { addToCart } from "../actions/cartActions";

const Menu = ({ menu }) => {
	const dispatch = useDispatch();
	const history = useHistory();

	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	const cart = useSelector((state) => state.cart);
	const { cartItems } = cart;

	const addToCartHandler = (e, name, id) => {
		e.preventDefault();
		let itemExist = cartItems.find((menuItem) => menuItem._id === id);
		if (itemExist) {
			history.push("/cart");
		} else if (userInfo) {
			toast(`${name} added to cart!`, {
				duration: 2000,
				style: {
					color: "#fe5f1e",
				},
				icon: "✅",
			});
			dispatch(addToCart(id, 1));
		} else {
			history.push("/login");
		}
	};

	return (
		<>
			<Toaster position='top-right'></Toaster>
			<div className='menu-box'>
				<Image className='menu-image' src={menu.image} alt={menu.name} />
				<div className='text-center'>
					<div className='menu-name'>{menu.name}</div>
					<span className='menu-size my-1'>{menu.size}</span>
					<div className='mt-3'>
						<div className='menu-price align-self-center'>₹{menu.price}</div>
						<div className='mt-3 align-content-center'>
							<button
								className='menu-addToCart'
								onClick={(e) => addToCartHandler(e, menu.name, menu._id)}
							>
								<div className='d-block'>
									<i className='fas fa-plus'></i>
									<span style={{ marginLeft: "0.5rem" }}>Add</span>
								</div>
							</button>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Menu;
