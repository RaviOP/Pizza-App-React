import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import FormContainer from "../components/FormContainer";
import { Container, Form, InputGroup } from "react-bootstrap";
import { getShippingDetails, createShippingDetails } from "../actions/shippingActions";
import Loader from "../components/Loader";
import Message from "../components/Message";

const ShippingDetailScreen = ({ history }) => {
	const [address, setAddress] = useState("");
	const [phone, setPhone] = useState("");
	const [city, setCity] = useState("");
	const [pinCode, setPinCode] = useState("");
	const [country, setCountry] = useState("India");

	const dispatch = useDispatch();
	const shippingDetail = useSelector((state) => state.shippingDetail);
	const {
		loading: loadingDetail,
		error: errorDetail,
		shippingAddress: shippingAddressDetail,
	} = shippingDetail;

	const shippingCreate = useSelector((state) => state.shippingCreate);
	const { loading: loadingCreate, success: successCreate, error: errorCreate } = shippingCreate;

	useEffect(() => {
		if (successCreate) {
			history.push("/order-confirm");
		} else if (!shippingAddressDetail) {
			dispatch(getShippingDetails());
		} else {
			setAddress(shippingAddressDetail.address || "");
			setPhone(shippingAddressDetail.phone || "");
			setCity(shippingAddressDetail.city || "");
			setPinCode(shippingAddressDetail.pinCode || "");
		}
	}, [dispatch, shippingAddressDetail, history, successCreate]);

	const submitHandler = (e) => {
		e.preventDefault();
		const detail = {
			address,
			city,
			phone,
			pinCode,
			country,
		};
		dispatch(createShippingDetails(detail));
	};

	return (
		<div className='profile-body'>
			<Container>
				<LinkContainer to='/cart'>
					<button className='mt-2 btn btn-primary'>&#8592; Go Back</button>
				</LinkContainer>
				<FormContainer>
					<div className='profile-form'>
						<span className='semi-heading'>Shipping Details</span>
						{loadingCreate && <Loader />}
						{errorCreate && <Message variant='danger' children={errorCreate} />}
						{loadingDetail ? (
							<Loader />
						) : errorDetail ? (
							<Message variant='danger'>{errorDetail}</Message>
						) : (
							<Form>
								<Form.Group controlId='address' className='mt-2'>
									<Form.Label>Address</Form.Label>
									<Form.Control
										type='text'
										placeholder='Enter your Address'
										value={address}
										onChange={(e) => setAddress(e.target.value)}
										required
									></Form.Control>
								</Form.Group>
								<Form.Group controlId='city'>
									<Form.Label>City</Form.Label>
									<Form.Control
										type='text'
										placeholder='Enter your City'
										value={city}
										onChange={(e) => setCity(e.target.value)}
										required
									></Form.Control>
								</Form.Group>
								<Form.Group controlId='pinCode'>
									<Form.Label>Pin Code</Form.Label>
									<Form.Control
										type='text'
										placeholder='Enter your Pincode'
										value={pinCode}
										onChange={(e) => setPinCode(e.target.value)}
										required
									></Form.Control>
								</Form.Group>
								<Form.Group controlId='phone'>
									<Form.Label>Mobile Number</Form.Label>
									<InputGroup>
										<InputGroup.Prepend>
											<InputGroup.Text>+91</InputGroup.Text>
										</InputGroup.Prepend>
										<Form.Control
											type='text'
											placeholder='Mobile Number'
											value={phone}
											onChange={(e) => setPhone(e.target.value)}
											required
										></Form.Control>
									</InputGroup>
								</Form.Group>
								<Form.Group controlId='country'>
									<Form.Label>Country</Form.Label>
									<Form.Control
										type='text'
										placeholder='Enter your Country'
										value={country}
										disabled
										onChange={(e) => setCountry(e.target.value)}
										required
									></Form.Control>
								</Form.Group>
								<div className='text-center mt-3'>
									<button
										onClick={submitHandler}
										className='btn btn-outline-success'
									>
										Submit
									</button>
								</div>
							</Form>
						)}
					</div>
				</FormContainer>
			</Container>
		</div>
	);
};

export default ShippingDetailScreen;
