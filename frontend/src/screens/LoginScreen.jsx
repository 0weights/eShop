import FormContainer from "../components/FormContainer";
import { Form, Button, Col, Row} from 'react-bootstrap';
import { useState, useEffect } from "react";
import {Link, useLocation, useNavigate} from 'react-router-dom';
import {useAuthMutation} from "../RTK/slices/userApiSlice.js";
import { setCrediantels } from "../RTK/slices/authSlice.js";
import Loadder from "../components/Loadder.jsx";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  const [login, {isLoadding}] = useAuthMutation();

  const {data, isLoading, isError} = useAuthMutation({email, password});
  const submitHanddler = (e) => {
    e.preventDefault();
    // isLoading ? console.log("loadding...") : isError ? console.log("error happened"): console.log(data)
  }
  useEffect(()=>{

  }, [])
  return (
    <>
      <FormContainer>
        <h1>Sign In</h1>
        <Form onSubmit={submitHanddler}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control 
              type="email" 
              placeholder="Enter email" 
              value={email}
              onChange={(e)=>{setEmail(e.target.value)}}
              />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control 
              type="password" 
              placeholder="Password"
              value={password}
              onChange={(e)=>{setPassword(e.target.value)}}
              />
          </Form.Group>

          <Button variant="primary" type="submit">
            Submit
          </Button>
          <Row py='3'>
            <Col>
              Don't have an account? <Link to="/register">Register</Link>
            </Col>
          </Row>
        </Form>
      </FormContainer>
    </>
  );
}

export default LoginScreen;