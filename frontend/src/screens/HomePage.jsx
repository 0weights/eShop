import { Row, Col } from "react-bootstrap"
import Product from "../components/Product";
import axios from 'axios';
import { useEffect, useState } from "react";
import { useGetProductsQuery } from "../RTK/slices/productApiSlice";

const HomePage = () => {
  // search differenct between {products, setProductas} and [products, setProductas] //
  // search rerender component using props 
  // const [products, setProducts] = useState([])

  //serach the empty array
  // useEffect(() => {
  //   (async () => {
  //     let axiosPromise = await axios.get(`/api/product`);
  //     setProducts(axiosPromise.data)
  //     return axiosPromise.data;
  //   })();
  // }, [])
  const {data: products, isLoading, isError} = useGetProductsQuery();
  return (
    <>
      {
        isLoading ? <h1>loadding</h1> : isError ? {isError} : 
        <Row>
          {
            products.map((product) => (
              <Col sm={12} md={6} l={4} xl={3}><Product product={product} /></Col>
            ))
          }
        </Row>
      }
    </>
  )
}

export default HomePage;