import FormContainer from "../components/FormContainer.jsx";
import { Form, Button, Col} from 'react-bootstrap';
import { useNavigate} from 'react-router-dom';
import { addPaymentInfo, updateCheckOutSteps } from "../RTK/slices/cartSlice.js";
import { useDispatch, useSelector } from "react-redux";
import NavigationTabs from "../components/NavigationTabs.jsx";
import { useEffect } from "react";

const PlaceorderScreen = () => {
  const {steps} = useSelector((state)=>state.cart.checkOut)

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const submitHanddler = async (e) => {
    e.preventDefault();
    dispatch(addPaymentInfo({payment : "paypal"}));
    dispatch(updateCheckOutSteps({step : 'placeOrder'}));

    navigate("/placeorder");
  }

  useEffect(()=>{
    console.log("steps", steps)
    if(steps.placeOrder && steps.payment){
      navigate("/shipping");
    }
    navigate('/payment')
  }, [steps, navigate])
  return (
    <FormContainer>
      <NavigationTabs/>
      <h1>Place Order</h1>
    </FormContainer>
  );
}

export default PlaceorderScreen;