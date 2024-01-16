import {Tabs, Tab} from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { updateCheckOutStep } from '../RTK/slices/cartSlice';
import { useNavigate } from 'react-router-dom';

const NavigationTabs = ({currentTab}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const updateStep = (step) => {
    console.log("here", step)
    dispatch(updateCheckOutStep({step}))
    navigate(`/${step}`);
  }
  return (
    <Tabs
      defaultActiveKey={currentTab}
      id="uncontrolled-tab-example"
      className="mb-3"
      onSelect={(step)=>updateStep(step)}
    >
      <Tab eventKey="shipping" title="Address">
        Tab content for Home
      </Tab>
      <Tab eventKey="payment" title="Payment">
        Tab content for Payment
      </Tab>
    </Tabs>
  )
}

export default NavigationTabs;