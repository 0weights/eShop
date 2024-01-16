import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Tab, Tabs } from 'react-bootstrap';
// why we put {} in funct paramter if you remove it it will not work
const FormContainer = ({children}) => {

  return(
    <Container>
      {/* // search for it */}
      <Row className='justify-content-md-center'>
        <Col xs={12} md={6}>

          {children}
        </Col>
      </Row>
    </Container>
  )
}

export default FormContainer;