import React, { useEffect } from "react";
import { Table, Image, Button, Row, Col, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";

import { deleteMenuItem, listAllMenuItems } from "../actions/menuActions";
import Loader from "../components/Loader";
import Message from "../components/Message";

const MenuListScreen = () => {
	const dispatch = useDispatch();

	const menuList = useSelector((state) => state.menuList);
	const { loading, menuItems, error } = menuList;

	const menuDelete = useSelector((state) => state.menuDelete);
	const { loading: loadingDelete, success: successDelete, error: errorDelete } = menuDelete;

	useEffect(() => {
		dispatch(listAllMenuItems());
	}, [dispatch, successDelete]);

	const deleteMenuHandler = (e, id) => {
		e.preventDefault();
		dispatch(deleteMenuItem(id));
	};

	return (
		<div className='menulist-body'>
			<Container>
				<Row className='align-items-center'>
					<Col>
						<h2 className='text-muted'>Menu List</h2>
					</Col>
					<Col className='text-end'>
						<LinkContainer to={`/admin/menu/new`}>
							<Button className='my-3' variant='outline-success'>
								<i className='fas fa-plus'></i> Create
							</Button>
						</LinkContainer>
					</Col>
				</Row>
				{loadingDelete && <Loader />}
				{errorDelete && <Message variant='danger' children={errorDelete} />}
				{loading ? (
					<Loader />
				) : error ? (
					<Message variant='danger'>{error}</Message>
				) : (
					<Table striped bordered hover responsive className='table-sm'>
						<thead>
							<tr className='text-center'>
								<th>IMAGE</th>
								<th>NAME</th>
								<th>SIZE</th>
								<th>PRICE</th>
								<th>ACTIONS</th>
							</tr>
						</thead>
						<tbody className='text-center'>
							{menuItems.map((menu) => (
								<tr key={menu._id}>
									<td>
										<Image
											src={menu.image}
											alt={menu.name}
											className='menulist-image'
											fluid
										/>
									</td>
									<td>{menu.name}</td>
									<td>{menu.size}</td>
									<td>₹{menu.price}</td>
									<td>
										<LinkContainer to={`/admin/menu/edit/${menu._id}`}>
											<Button variant='dark' className='btn-sm'>
												<i className='fas fa-edit'></i>
											</Button>
										</LinkContainer>
										<Button
											variant='danger'
											className='btn-sm'
											onClick={(e) => deleteMenuHandler(e, menu._id)}
										>
											<i className='fas fa-trash'></i>
										</Button>
									</td>
								</tr>
							))}
						</tbody>
					</Table>
				)}
			</Container>
		</div>
	);
};

export default MenuListScreen;
