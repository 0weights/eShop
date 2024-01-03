import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { BsCart2 } from "react-icons/bs";
import { LinkContainer} from "react-router-bootstrap";
import Badge from 'react-bootstrap/Badge'
import { useSelector } from 'react-redux';

const Header = () => {
  const cartCount = useSelector(state => state.cart.count);
  return (
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
            <LinkContainer to="/login">
              <Nav.Link>Log In</Nav.Link>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
export default Header;
