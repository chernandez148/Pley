import {Link} from 'react-router-dom';
import { Col } from 'react-bootstrap';

function BusinessCard({business}) {
    console.log(business.id)

     return (
         <Link to={`/businesses/${business.id}`}> 
           <Col>
             <h2>{business.business_name}</h2>
             <img src={business.business_image}/>
             <p>{business.business_city}, {business.business_state}</p>
          </Col>
         </Link>
     )
}
  
  export default BusinessCard