import { IoIosSearch } from 'react-icons/io';
import { Row, Col } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import './NavBar.css'

function NavBar() {
    return (
        <Container fluid className="NavBar p-3">
            <Row className='align-items-center'>
                <Col>
                    <h1>Logo</h1>
                </Col>
                <Col xs={6}>
                    <Form className="form d-flex">
                        <Form.Control
                            type="search"
                            placeholder="True Foods"
                            className="me-2"
                            aria-label="Search"
                        />
                        <Form.Control
                            type="search"
                            placeholder="Irvine"
                            className="me-2"
                            aria-label="Search"
                        />
                        <Button><IoIosSearch /></Button>
                    </Form>
                </Col>
                <Col className='d-flex justify-content-center'>
                    <Nav.Link className='border me-3 px-3 py-2' href="#action1">Sign In</Nav.Link>
                    <Nav.Link className='border me-3 px-3 py-2' href="#action2">Sign Up</Nav.Link>
                </Col>
            </Row>
        </Container>
    );
}

export default NavBar;