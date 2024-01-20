import FormContainer from "../components/FormContainer";
import { Form, Button, Col, Row} from 'react-bootstrap';
import { useState, useEffect } from "react";
import {Link, useLocation, useNavigate} from 'react-router-dom';
import {useAuthMutation} from "../RTK/slices/userApiSlice.js";
import { setCrediantels } from "../RTK/slices/authSlice.js";
import Loadder from "../components/Loadder.jsx";
// react, react-route hooks write it down
import { useDispatch, useSelector } from "react-redux";
import { toast } from 'react-toastify';
const LoginScreen = () => {

  const {userInfo} = useSelector((state) => state.auth);
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const navigate = useNavigate();
  
  const [auth, {isLoadding}] = useAuthMutation();
  
  const dispatch = useDispatch();
  
  const {search}  = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect");
  console.log(redirect)
  // console.log(redirect)
  // why we ues this [userInfo, redirect, navigate] in the opetions part 
  // explaining useEffect
  // home  -> login
  // login -> home
  // checkout -> login
  // 
  useEffect(()=>{
    if(userInfo != null)                                                                                                        
      navigate('/');
    if(redirect != null)
      navigate(`/${redirect}`)
    // why including navigate 
  }, [userInfo, redirect, navigate])


  const submitHanddler = async (e) => {
    // why we used this
    e.preventDefault();
    // why we use try & catch is this mean that i need to spam try catch using andy function
    try{
      // what is unwrap
      const res = await auth({email, password}).unwrap();
      // what is the ... dots and why we do it and what is , 
      // dispatch(setCrediantels({...res, }))
      // there is no need to use {...or , }
      dispatch(setCrediantels(res))
      navigate(redirect);
    }catch (err) {
      // what is err?.data.message || err.error and what is ? and why we use both 
      // the toast shows a big error track it 
      toast.error(err?.data.message || err.error)
    }
    // isLoading ? console.log("loadding...") : isError ? console.log("error happened"): console.log(data)
  }
  return (
    <>
      <FormContainer>
        <h1>Log In</h1>
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

          <Button variant="primary" type="submit" disabled={isLoadding}>
            Log In
          </Button>
          {isLoadding ? <Loadder/> : ''}
        </Form>
        <Row py='3'>
          <Col>
            Don't have an account? 
            <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>Register</Link>
          </Col>
        </Row>
      </FormContainer>
    </>
  );
}

export default LoginScreen;