import { useSelector } from "react-redux";
import { Card, ListGroup } from "react-bootstrap"
import { Link, useNavigate} from "react-router-dom";
import {Row, Col} from "react-bootstrap";
// diffrence between "" and '
import Image from 'react-bootstrap/Image';
import { addToCart, removeFromCart } from "../RTK/slices/cartSlice";
import { useDispatch } from "react-redux";
import { Form, Button } from "react-bootstrap";
import { FaTrash } from 'react-icons/fa';

const CartScreen = () =>{
  const cartState = useSelector(state => state.cart);
  const dispatche = useDispatch();
  const navigate = useNavigate();
  // why we make it async and why we didn't use await 
  const updateStateQty = async (item, updatedQty) => {
    
    // notice here item contining qty but when doing what i did below it update it cause it's exist
    dispatche(addToCart({...item, qty : updatedQty}))
  }
  const removeItem = async (itemId) => {
    // notice here item contining qty but when doing what i did below it update it cause it's exist
    dispatche(removeFromCart(itemId));
  }
  const checkoutHandler = () => {
    navigate('/shipping');
  };
  // what this kind of return first time to see it
  return (
    <>
      <Row>   
        <Col md="8">
          <h1>Shopping Cart</h1>
          {
            cartState.cartItems.map((item) => (
              <ListGroup.Item >
                <Row>
                  <Col md='2'>
                    <Link to={`/item/${item._id}`}>
                        <Image src={item.image} fluid rounded />
                    </Link>
                  </Col>
                  <Col md='2'>
                  <p>{item.name}</p>
                  </Col>
                  <Col md='2'>
                    <p>${item.price}</p>
                  </Col>
                  <Col md='2'>
                    {/* // need to break this form and understand it's attributes*/}
                    <Form.Control
                      as='select'
                      value={item.qty}
                      onChange={(e)=> updateStateQty(item, Number(e.target.value))}
                    >
                      {
                        [...Array(Number(item.countInStock)).keys()].map((x) => (
                          ++x && <option key={x} value={x}>{x}</option>
                        ))
                      }
                    </Form.Control>
                  </Col>
                  <Col md='2' onClick={() => {removeItem(item._id)}}>
                    <FaTrash/>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))
          }
        </Col>
        <Col md="4">
          <Card className="my-3 p-3">
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <Card.Body>
                  <Card.Title className="subtotal">
                    Subtotal {cartState.count} items
                  </Card.Title>
                  <Card.Text>${cartState.totalPrice}</Card.Text>
                </Card.Body>
              </ListGroup.Item>
              <ListGroup.Item>
                <Button
                  type='button'
                  className='btn-block'
                  disabled={cartState.count === 0}
                  onClick={checkoutHandler}
                >
                  Proceed To Checkout
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
}

export default CartScreen;