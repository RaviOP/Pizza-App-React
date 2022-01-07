import React, { useState, useEffect } from "react";
import { Form, Button, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import { getUserDetail, updateUser } from "../actions/userActions";
import { USER_DETAILS_RESET, USER_UPDATE_RESET } from "../constants/userConstants";
import Message from "../components/Message";
import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";

const UserEditScreen = ({ history, match }) => {
	const userId = match.params.id;
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [isAdmin, setIsAdmin] = useState(false);

	const dispatch = useDispatch();
	const userDetails = useSelector((state) => state.userDetails);
	const { loading, error, user } = userDetails;

	const userUpdate = useSelector((state) => state.userUpdate);
	const { loading: loadingUpdate, error: errorUpdate, success: successUpdate } = userUpdate;

	useEffect(() => {
		if (successUpdate) {
			dispatch({ type: USER_UPDATE_RESET });
			dispatch({ type: USER_DETAILS_RESET });
			history.push("/admin/userlist");
		} else if (!user || !user.name) {
			dispatch(getUserDetail(userId));
		} else {
			setName(user.name);
			setEmail(user.email);
			setIsAdmin(user.isAdmin);
		}
	}, [user, dispatch, userId, successUpdate, history]);

	const submitHandler = (e) => {
		e.preventDefault();
		dispatch(updateUser(userId, { name, email, isAdmin }));
	};

	const goBackHandler = (e) => {
		e.preventDefault();
		dispatch({ type: USER_DETAILS_RESET });
		history.push("/admin/userlist");
	};

	return (
		<div className='profile-body'>
			<Container>
				<button
					type='button'
					onClick={goBackHandler}
					className='mt-3 btn btn-outline-danger'
				>
					GO BACK
				</button>
				<FormContainer>
					<div className='profile-form'>
						<span className='heading'>EDIT USER</span>
						{loadingUpdate && <Loader />}
						{errorUpdate && <Message variant='danger' children={errorUpdate} />}
						{loading ? (
							<Loader />
						) : error ? (
							<Message variant='danger'>{error}</Message>
						) : (
							<Form onSubmit={submitHandler}>
								<Form.Group controlId='name'>
									<Form.Label>Name</Form.Label>
									<Form.Control
										type='text'
										placeholder='Name'
										value={name}
										onChange={(e) => setName(e.target.value)}
										disabled
									></Form.Control>
								</Form.Group>
								<Form.Group controlId='email'>
									<Form.Label>Email Address</Form.Label>
									<Form.Control
										type='email'
										placeholder='Email'
										value={email}
										onChange={(e) => setEmail(e.target.value)}
										disabled
									></Form.Control>
								</Form.Group>
								<Form.Group controlId='isAdmin' className='my-2'>
									<Form.Check
										label='Is Admin'
										type='checkbox'
										checked={isAdmin}
										onChange={(e) => setIsAdmin(e.target.checked)}
									></Form.Check>
								</Form.Group>
								<div className='text-center mt-3'>
									<Button type='submit' variant='primary'>
										Update
									</Button>
								</div>
							</Form>
						)}
					</div>
				</FormContainer>
			</Container>
		</div>
	);
};

export default UserEditScreen;
