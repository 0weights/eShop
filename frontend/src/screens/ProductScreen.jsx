import { useParams, Link } from "react-router-dom";
import { Form, Row, Col, ListGroup, Image, Card, Button, NavItem } from "react-bootstrap";
import Rating from "../components/Rating";
import { useGetProductQuery } from "../RTK/slices/productApiSlice";
import Loadder from "../components/Loadder";
import Message from "../components/Message";
import { useState } from "react";
import { addToCart } from "../RTK/slices/cartSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { api } from "../RTK/slices/cartSlice";
const ProductScreen = () => {
  const {id} = useParams();
  const {data : product , isLoading, isError} = useGetProductQuery(id);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [qty, setQty] = useState(1);

  const addToCartHandler = () => {
    const lol = addToCart({...product, qty});
    dispatch(addToCart({...product, qty}));
    navigate('/cart');
  }
  return (
    <>
    <Link className="btn btn-dark my-3" to="/">
      Go Back
    </Link>
    {
      isLoading ? <Loadder/> : isError ? 
      <Message variant="danger">
        "Sorry something went wrong"
      </Message>: 
        <Row>
          <Col md={5}>
            <Image src={product.image} alt="product" fluid />
          </Col>
          <Col md={4}>
            <ListGroup variant="flush">
              <ListGroup.Item className="productTitle">
                <h3>{product.name}</h3>
              </ListGroup.Item>
              <ListGroup.Item>
                <Rating
                  ratingValue={product.rating}
                  reviews={product.numReviews}
                />
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>Price: ${product.price}</strong>
              </ListGroup.Item>
              <ListGroup.Item>{product.description}</ListGroup.Item>
            </ListGroup>
          </Col>
          <Col md={3}>
            <Card>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Row>
                    <Col>Price:</Col>
                    <Col>
                      <strong>${product.price}</strong>
                    </Col>
                  </Row>
                </ListGroup.Item>
                {
                  // && is new
                  product.countInStock > 0 ?(
                    <ListGroup.Item>
                      <Row>
                        <Col>Qyt:</Col>
                        <Col>
                          <Form.Control
                            as='select'
                            value={qty}
                            onChange={(e)=> setQty(Number(e.target.value))}
                          >
                            {
                              [...Array(Number(product.countInStock)).keys()].map((x) => (
                                // need to check for ++x & x++
                                ++x && <option key={x} value={x}>{x}</option>
                              ))
                            }
                          </Form.Control>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ) :(
                      <ListGroup.Item>
                        <Row>
                          <Col>Status:</Col>
                          <Col>
                            <span> Out Of Stock </span>
                          </Col>
                        </Row>
                      </ListGroup.Item>
                    )
                }

                <ListGroup.Item>
                  <Row>
                    <Col>
                      <Button
                        className="btn btn-dark my-3"
                        disabled={product.countInStock === 0}
                        onClick={addToCartHandler}
                      >
                        Add To Cart
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              </ListGroup>

              {/* <CardText>Price: <span>{product.price}</span></CardText>
                              <CardText> </CardText>
                              <CardText>Qty: <span>{product.countInStock}</span></CardText>
                      */}
            </Card>
          </Col>
        </Row>
    }
    </>
  );
};

export default ProductScreen;