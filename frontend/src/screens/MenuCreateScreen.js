import React, { useState, useRef, useEffect } from "react";
import { Button, Form, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import FormContainer from "../components/FormContainer";
import { createMenuItem } from "../actions/menuActions";
import { MENU_CREATE_RESET } from "../constants/menuConstants";
import Message from "../components/Message";
import Loader from "../components/Loader";

const MenuCreateScreen = ({ history }) => {
	const inputFile = useRef();

	const [name, setName] = useState("");
	const [size, setSize] = useState("");
	const [price, setPrice] = useState("");
	const [image, setImage] = useState("");
	const [file, setFile] = useState("");
	const [message, setMessage] = useState("");

	let dispatch = useDispatch();

	let menuCreate = useSelector((state) => state.menuCreate);
	let { loading, success, error } = menuCreate;

	useEffect(() => {
		if (success) {
			dispatch({ type: MENU_CREATE_RESET });
			history.push("/admin/menulist");
		}
	}, [success, dispatch, history]);

	const imagePicked = (e) => {
		e.preventDefault();
		let selectedImage = e.target.files[0];
		setFile(selectedImage);
		const reader = new FileReader();
		reader.onload = () => {
			setImage(reader.result);
		};
		reader.readAsDataURL(selectedImage);
	};

	let submitHandler = (e) => {
		e.preventDefault();
		if (name !== "" && size !== "" && price !== "" && file !== "") {
			dispatch(createMenuItem(name, size, price, file));
		} else {
			setMessage("All Fields are Required");
		}
	};

	return (
		<div className='profile-body'>
			<FormContainer>
				<div className='profile-form'>
					<span className='heading'>NEW PIZZA</span>
					{message && <Message variant='danger'>{message}</Message>}
					{error && <Message variant='danger'>{error}</Message>}
					{loading && <Loader />}
					<Form onSubmit={submitHandler}>
						<Form.Group controlId='name'>
							<Form.Label>Name</Form.Label>
							<Form.Control
								type='text'
								value={name}
								onChange={(e) => setName(e.target.value)}
								required
							></Form.Control>
						</Form.Group>
						<Form.Group controlId='image' className>
							<Form.Label>Image</Form.Label>
							{image && (
								<div className='text-center'>
									<Image
										src={image}
										alt={"Pizza"}
										fluid
										style={{ maxWidth: "8rem" }}
									/>
								</div>
							)}
							<div className='text-center py-2'>
								<input
									type='file'
									ref={inputFile}
									style={{ display: "none" }}
									onChange={imagePicked}
								/>
								<button
									type='button'
									className='btn btn-sm btn-outline-secondary'
									onClick={() => inputFile.current.click()}
								>
									Choose Image
								</button>
							</div>
						</Form.Group>
						<Form.Group controlId='size'>
							<Form.Label>Size</Form.Label>
							<select
								className='form-select'
								value={size}
								onChange={(e) => setSize(e.target.value)}
								required
							>
								<option disabled></option>
								<option value='SMALL'>SMALL</option>
								<option value='MEDIUM'>MEDIUM</option>
								<option value='LARGE'>LARGE</option>
							</select>
						</Form.Group>
						<Form.Group controlId='price'>
							<Form.Label>Price</Form.Label>
							<Form.Control
								type='number'
								value={price}
								onChange={(e) => setPrice(e.target.value)}
								required
							></Form.Control>
						</Form.Group>

						<div className='d-flex mt-4'>
							<div className='flex-grow-1'>
								<Link
									to='/admin/menulist'
									className='btn btn-sm btn-outline-danger'
								>
									Cancel
								</Link>
							</div>
							<div>
								<Button type='submit' size='sm' variant='outline-success'>
									Create
								</Button>
							</div>
						</div>
					</Form>
				</div>
			</FormContainer>
		</div>
	);
};

export default MenuCreateScreen;
