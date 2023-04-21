import React from 'react'
import { Container, Row, Col } from 'react-bootstrap';
import App from '../../App';

import BusinessCard from "./BusinessCard";

function BusinessContainer({businesses}) {
    console.log(businesses)
    return (
       <div>
           <Container>
                <Row>{businesses.map(business => <BusinessCard key={business.id} business={business}  />)}
                </Row>
           </Container>
       </div>
      )
}

export default BusinessContainer