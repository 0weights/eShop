import FormContainer from "../components/FormContainer.jsx";
import { Form, Button, Col, Row} from 'react-bootstrap';
import { useState, useEffect } from "react";
import {Link, redirectDocument, useLocation, useNavigate} from 'react-router-dom';
import {useRegisterMutation} from "../RTK/slices/userApiSlice.js";
import { setCrediantels } from "../RTK/slices/authSlice.js";
import Loadder from "../components/Loadder.jsx";
import { useDispatch, useSelector } from "react-redux";
import { toast } from 'react-toastify';
const RegisterScreen = () => {
  const {userInfo} = useSelector((state) => state.auth);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const navigate = useNavigate();
  
  const [register, {isLoadding}] = useRegisterMutation();
  
  const dispatch = useDispatch();
  
  const {search}  = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect");
  console.log(redirect)
  // console.log(redirect)
  // why we ues this [userInfo, redirect, navigate] in the opetions part 
  // 
  useEffect(()=>{
    if(userInfo != null)                                                                                                        
      navigate('/');
    if(redirect != null)
      navigate(`/${redirect}`)
  }, [userInfo, redirect])

  const submitHanddler = async (e) => {
    // why we used this
    e.preventDefault();
    // why we use try & catch is this mean that i need to spam try catch using andy function
    try{
      // what is unwrap
      const res = await register({name, email, password}).unwrap();
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
        <h1>Regiser</h1>
        <Form onSubmit={submitHanddler}>

        <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Name</Form.Label>
            <Form.Control 
              type="text" 
              placeholder="Enter Name" 
              value={name}
              onChange={(e)=>{setName(e.target.value)}}
              />
          </Form.Group>

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
            Register
          </Button>
          {isLoadding ? <Loadder/> : ''}
        </Form>
        <Row py='3'>
          <Col>
            already have an account! 
            <Link to={'/logIn'}>Log In</Link>
          </Col>
        </Row>
      </FormContainer>
    </>
  );
}

export default RegisterScreen;