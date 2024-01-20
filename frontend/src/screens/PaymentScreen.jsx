import FormContainer from "../components/FormContainer.jsx";
import { Form, Button, Col} from 'react-bootstrap';
import { useNavigate} from 'react-router-dom';
import { addPaymentInfo, updateCheckOutSteps } from "../RTK/slices/cartSlice.js";
import { useDispatch, useSelector } from "react-redux";
import NavigationTabs from "../components/NavigationTabs.jsx";
import { useEffect } from "react";

const PaymentScreen = () => {
  const {payment} = useSelector((state)=>state.cart.checkOut.steps)
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const submitHanddler = async (e) => {
    e.preventDefault();
    dispatch(addPaymentInfo({payment : "paypal"}));
    dispatch(updateCheckOutSteps({step : 'placeOrder'}));

    navigate("/placeorder");
  }
  //if i replaced use effect with this code it will not work
  // if(payment){
  //   console.log("navigate to shipping", navigate("/shipping"));
  // }
  useEffect(()=>{
    if(payment){
      navigate("/shipping");
    }
  }, [payment, navigate])
  return (
    <FormContainer>
      <NavigationTabs/>
      <h1>Payment Method</h1>
      <Form onSubmit={submitHanddler}>
        <Form.Group>
          <Form.Label as='legend'>Select Method</Form.Label>
          <Col>
            <Form.Check
              className='my-2'
              type='radio'
              label='PayPal or Credit Card'
              id='PayPal'
              name='paymentMethod'
              value='PayPal'
              checked
            ></Form.Check>
          </Col>
        </Form.Group>

        <Button type='submit' variant='primary'>
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
}

export default PaymentScreen;