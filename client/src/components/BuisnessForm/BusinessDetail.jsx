import {useParams, useHistory} from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';

function BusinessDetail() {
    const [business, setBusiness] = useState({reviews: []})
    const [error, setError] = useState(null)

    console.log(business)

    const params = useParams()
    const history = useHistory()

    useEffect(() => {
        fetch(`/businesses/${params.id}`)
        .then(res => { 
            if (res.ok) {
                res.json().then(data => setBusiness(data))
            } else {
                res.json().then(data => setError(data.error))
            }
        })
    }, [])

    return (
        <Container>
            <Row>
                <Col>
                <h1>
                    {business.business_name}
                </h1>
                <h4>
                    {business.business_category}
                </h4>
                <img src={business.business_image}/>
                <h3>
                    {business.business_address}
                </h3>
                <h3>
                    {business.business_number}
                </h3>
                <h5>
                    {business.business_description}
                </h5>
                <h6>
                    {business.reviews.map(review => <div key={review.id}>Rating: {review.rating} <br></br>{review.review} <br></br></div>)}
                </h6>
                <Button>Add Review</Button>
                </Col>
            </Row>
        </Container>
    )
}

export default BusinessDetail
