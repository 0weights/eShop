import { Card } from "react-bootstrap"
import { Link } from "react-router-dom";
import Rating from "./Rating";

const Product = ({product}) => {
    return(
        <>
            <Link to={`/product/${product._id}`}>
                <Card className="my-3 p-3">
                    <Card.Img variant="top"  src={product.image} />
                    <Card.Body>
                        <Card.Title className="productTitle">{product.name}</Card.Title>
                        <Card.Text>< Rating ratingValue = {product.rating} reviews = {product.numReviews} /> </Card.Text>
                        <Card.Text >${product.price}</Card.Text>
                    </Card.Body>
                </Card>
            </Link>
        </>
    )
}

export default Product;