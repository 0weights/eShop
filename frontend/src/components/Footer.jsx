import {Container, Row, Col} from "react-bootstrap/";

const Footer = () => {
    const currentYear = new Date().getFullYear();
    return(
        <footer className="bg-dark text-white">
            <Container>
                <Row>
                    <Col className="text-center py-3">
                        <p className="m-0">Copyright &copy; {currentYear} eShop</p>
                    </Col>
                </Row>
            </Container>  
        </footer>  
    )
}
export default Footer;  