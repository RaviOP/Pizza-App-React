import React from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../actions/userActions";
import { IndexLinkContainer, LinkContainer } from "react-router-bootstrap";
import { NavDropdown, Navbar, Nav, Container, Image } from "react-bootstrap";

const Header = () => {
	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;
	const dispatch = useDispatch();
	const history = useHistory();

	const logoutHandler = () => {
		dispatch(logout());
		history.push("/login");
	};

	return (
		<header>
			<Navbar bg='white' expand='md' collapseOnSelect>
				<Container>
					<IndexLinkContainer exact to='/'>
						<Navbar.Brand className='d-flex flex-md-grow-1'>
							<Image src='/logo.png' alt='Pizza-App' fluid />
						</Navbar.Brand>
					</IndexLinkContainer>
					<Navbar.Toggle aria-controls='basic-navbar-nav' />
					<Navbar.Collapse id='basic-navbar-nav'>
						<Nav className='text-center'>
							<IndexLinkContainer exact to='/'>
								<Nav.Link>Home</Nav.Link>
							</IndexLinkContainer>
							<LinkContainer to='/cart'>
								<Nav.Link>Cart</Nav.Link>
							</LinkContainer>
							{userInfo && !userInfo.isAdmin && (
								<>
									<LinkContainer to='/orders'>
										<Nav.Link>Orders</Nav.Link>
									</LinkContainer>
									<NavDropdown title={userInfo.name}>
										<LinkContainer to='/profile'>
											<NavDropdown.Item>Profile</NavDropdown.Item>
										</LinkContainer>

										<NavDropdown.Item onClick={logoutHandler}>
											Logout
										</NavDropdown.Item>
									</NavDropdown>
								</>
							)}
							{!userInfo && (
								<>
									<IndexLinkContainer exact to='/login'>
										<Nav.Link>Login</Nav.Link>
									</IndexLinkContainer>
									<LinkContainer to='/register'>
										<Nav.Link>Register</Nav.Link>
									</LinkContainer>
								</>
							)}
							{userInfo && userInfo.isAdmin && (
								<>
									<LinkContainer to='/admin/orders'>
										<Nav.Link>Orders</Nav.Link>
									</LinkContainer>
									<NavDropdown title={userInfo.name} id='adminMenu'>
										<LinkContainer to='/profile'>
											<NavDropdown.Item>Profile</NavDropdown.Item>
										</LinkContainer>
										<LinkContainer to='/admin/userlist'>
											<NavDropdown.Item>Users</NavDropdown.Item>
										</LinkContainer>
										<LinkContainer to='/admin/menulist'>
											<NavDropdown.Item>Menu</NavDropdown.Item>
										</LinkContainer>
										<NavDropdown.Item onClick={logoutHandler}>
											Logout
										</NavDropdown.Item>
									</NavDropdown>
								</>
							)}
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
		</header>
	);
};

export default Header;
