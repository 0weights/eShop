import FormContainer from "../components/FormContainer.jsx";
import { Form, Button} from 'react-bootstrap';
import { useState } from "react";
import { useNavigate} from 'react-router-dom';
import { addAddressInfo } from "../RTK/slices/cartSlice.js";
import { useDispatch, useSelector } from "react-redux";
import NavigationTabs from "../components/NavigationTabs.jsx";
import { updateCheckOutSteps } from "../RTK/slices/cartSlice.js";

const ShippingScreen = () => {
  const {addressInfo} = useSelector((state) => state.cart);
  const [address, setAddress] = useState(addressInfo.address || "");
  const [city, setCity] = useState(addressInfo.city || "");
  const [postalCode, setPostalCode] = useState(addressInfo.postalCode || "");
  const [country, setCountry] = useState(addressInfo.country || "");
  // const [steps, setSteps] = useState(checkOut.steps)

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const submitHanddler = async (e) => {
    e.preventDefault();
    dispatch(addAddressInfo({address, city, postalCode, country}));
    dispatch(updateCheckOutSteps({step : 'payment'}));
    navigate("/payment");
  }

  return (
    <>
      <FormContainer>
        <NavigationTabs/>
        <h1>Shipping Address</h1>
        <Form onSubmit={submitHanddler}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Address</Form.Label>
            <Form.Control 
              type="text" 
              placeholder="Enter Address" 
              value={address}
              onChange={(e)=>{setAddress(e.target.value)}}
              />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>City</Form.Label>
            <Form.Control 
              type="text" 
              placeholder="Enter City" 
              value={city}
              onChange={(e)=>{setCity(e.target.value)}}
              />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Postal Code</Form.Label>
            <Form.Control 
              type="number" 
              placeholder="Enter PostalCode"
              value={postalCode}
              onChange={(e)=>{setPostalCode(e.target.value)}}
              />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Country</Form.Label>
            <Form.Control 
              type="text" 
              pattern="[A-Za-z]+"
              placeholder="Enter Country"
              value={country}
              onChange={(e)=>{setCountry(e.target.value)}}
              />
          </Form.Group>

          <Button variant="primary" type="submit">
            Procced
          </Button>
        </Form>
      </FormContainer>
    </>
  );
}

export default ShippingScreen;