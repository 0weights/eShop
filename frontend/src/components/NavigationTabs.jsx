import {Navbar, Container, Nav} from 'react-bootstrap';
import { LinkContainer} from "react-router-bootstrap";
import { useSelector } from 'react-redux';

const NavigationTabs = () => {  
  const {steps} = useSelector((state)=>state.cart.checkOut);
  console.log("navigation", steps.payment);
  return (
    <Navbar expand="lg" className='justify-content-center mb-3'>
      <Container>
        <LinkContainer to="/shipping">
          <Nav.Link >Shipping</Nav.Link>
        </LinkContainer>

        <LinkContainer 
          to="/payment" 
          disabled={steps.payment}
        >
          <Nav.Link >Payment</Nav.Link>
        </LinkContainer>

        <LinkContainer 
          to="/placeorder"
          disabled={steps.placeOrder}
        >
          <Nav.Link >Place Order</Nav.Link >
        </LinkContainer>
      </Container>
    </Navbar>
  )
}

export default NavigationTabs;