import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { BsCart2 } from "react-icons/bs";
import { LinkContainer} from "react-router-bootstrap";
import Badge from 'react-bootstrap/Badge'
import { useSelector } from 'react-redux';
import {NavDropdown} from 'react-bootstrap'
import { useLogOutMutation } from "../RTK/slices/userApiSlice";
import { logOut as frontEndLogout } from "../RTK/slices/authSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

const Header = () => {
  const navigate = useNavigate();
  const cartCount = useSelector(state => state.cart.count);
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));
  const [logOut] = useLogOutMutation();
  const dispatch = useDispatch()
  const logoutHandler = async () => {
    try{
      dispatch(frontEndLogout());
      await logOut();
      navigate('/');
    }catch(err){
      toast.error(err);
    }

  }
  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelec>
        <Container fluid>
          <LinkContainer to="/">
            <Navbar.Brand>eShop</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic=navbar-nav">
            <Nav className="ms-auto">
              <LinkContainer to="/cart">
                <Nav.Link>
                  <BsCart2 />
                  <Badge bg="success">{cartCount}</Badge>
                </Nav.Link>
              </LinkContainer>
              {
                userInfo ? (
                  <NavDropdown title={userInfo.name} id='username'>
                    <LinkContainer to='/profile'>
                      <NavDropdown.Item>Profile</NavDropdown.Item>
                    </LinkContainer>
                    <NavDropdown.Item onClick={logoutHandler}>
                      Logout
                    </NavDropdown.Item>
                  </NavDropdown>
                ) : (
                  <LinkContainer to="/login">
                    <Nav.Link>Log In</Nav.Link>
                  </LinkContainer>
                )
              }
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};
export default Header;
