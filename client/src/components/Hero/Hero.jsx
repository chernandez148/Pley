import React from 'react'
import { Container, Row, Col } from 'react-bootstrap';
import VideoContainer from '../VideoContainer/VideoContainer';


function Hero() {
    return (
        <Container fluid className='p-0'>
            <VideoContainer />
            <Row className='py-5 m-0'>
                <h3>Places you might like</h3>
            </Row>
        </Container>
    )
}

export default Hero