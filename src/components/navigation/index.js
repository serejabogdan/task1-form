// outsource dependencies
import React from 'react';
import { Link } from 'react-router-dom';
import { Nav, Navbar, NavItem } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';

// local dependencies
import { selector } from '../../pages/reducer';
import { TYPE } from '../../pages/private/reducer';
import { HOMEPAGE, SIGN_IN, USERS } from '../../constants/routes';

function Navigation () {
  const auth = useSelector(selector);
  const dispatch = useDispatch();
  return auth
    ? <Navbar color="light" light expand="md">
      <Nav className="mr-auto" navbar>
        <NavItem>
          <Link to={USERS.link()} className="p-2">Users</Link>
        </NavItem>
        <NavItem>
          <Link to={HOMEPAGE.link()} className="p-2">Homepage</Link>
        </NavItem>
        <NavItem>
          <Link to={SIGN_IN.link()} className="p-2" onClick={() => dispatch({ type: TYPE.LOGOUT })}>LogOut</Link>
        </NavItem>
      </Nav>
    </Navbar>
    : <Navbar color="light" light expand="md">
      <Nav className="mr-auto" navbar>
        <NavItem>
          <Link to={SIGN_IN.link()} className="p-2">SignIn</Link>
        </NavItem>
        <NavItem>
          <Link to={SIGN_IN.link()} className="p-2">SignUp</Link>
        </NavItem>
      </Nav>
    </Navbar>;
}

export default Navigation;
