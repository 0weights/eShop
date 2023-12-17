import { useParams, Link } from "react-router-dom";
import { Row, Col, ListGroup, Image, Card, Button } from "react-bootstrap";
import Rating from "../components/Rating";
import axios from "axios";
import { useEffect, useState } from "react";
const ProductScreen = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const getProduct = async () => {
    let productPromise = await axios.get(`/api/product/${id}`);
    setProduct(productPromise.data);
    console.log(product);
  };

  useEffect(() => {
    getProduct();
  }, []);
  return (
    <>
      <Link className="btn btn-dark my-3" to="/">
        Go Back
      </Link>
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
              <ListGroup.Item>
                <Row>
                  <Col>Status:</Col>
                  <Col>
                    {product.countInStock > 0 ? (
                      <span> In Stock </span>
                    ) : (
                      <span> Out Of Stock </span>
                    )}
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>
                    <Button
                      className="btn btn-dark my-3"
                      disabled={product.countInStock === 0}>
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
    </>
  );
};

export default ProductScreen;


