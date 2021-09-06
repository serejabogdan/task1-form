// outsource dependencies
import React from 'react';
import { Link } from 'react-router-dom';
import { Nav, Navbar, NavItem } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';

// local dependencies
import { selector } from '../../pages/reducer';
import { TYPE } from '../../pages/private/reducer';
import { PRIVATE_HOMEPAGE, PRIVATE_USER, PRIVATE_USERS, PUBLIC_SIGN_IN, PUBLIC_SIGN_UP } from '../../constants/routes';

// styles
import './style.css';

function Navigation () {
  const auth = useSelector(selector);
  const dispatch = useDispatch();
  return auth
    ? <Navbar color="light" light expand="md">
      <Nav className="mr-auto" navbar>
        <NavItem>
          <Link to={PRIVATE_USERS}>Users</Link>
        </NavItem>
        <NavItem>
          <Link to={PRIVATE_HOMEPAGE}>Homepage</Link>
        </NavItem>
        <NavItem>
          <Link to={PRIVATE_USER}>User</Link>
        </NavItem>
        <NavItem>
          <Link to="/sign-in" onClick={() => dispatch({ type: TYPE.LOGOUT })}>LogOut</Link>
        </NavItem>
      </Nav>
    </Navbar>
    : <Navbar color="light" light expand="md">
      <Nav className="mr-auto" navbar>
        <NavItem>
          <Link to={PUBLIC_SIGN_IN}>SignIn</Link>
        </NavItem>
        <NavItem>
          <Link to={PUBLIC_SIGN_UP}>SignUp</Link>
        </NavItem>
      </Nav>
    </Navbar>;
}

export default Navigation;
