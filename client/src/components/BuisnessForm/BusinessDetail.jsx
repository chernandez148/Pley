import { useParams, useHistory } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import AddReview from './AddReview'

function BusinessDetail({ user, addReviews, users, deleteReviews }) {
    const [business, setBusiness] = useState({ reviews: [] });
    const [error, setError] = useState(null);
    const [userReviewID, setUserReviewID] = useState()
    const params = useParams();


    useEffect(() => {
        getBusinessByID()
        getReviewsByID()
    }, []);


    const getBusinessByID = () => {
        fetch(`/businesses/${params.id}`)
            .then((res) => {
                if (res.ok) {
                    res.json().then((data) => setBusiness(data));
                } else {
                    res.json().then((data) => setError(data.error));
                }
            });
    }

    const getReviewsByID = () => {
        fetch(`/reviews/${params.id}`)
            .then(resp => resp.json())
            .then(setUserReviewID)
    }

    const handleDelete = (userReviewID) => {
        fetch(`/reviews/${params.id}`, {
            method: 'DELETE',
        })
            .then(() => {
                deleteReviews(userReviewID)

            })
    }

    return (
        <Container>
            <Row>
                <Col>
                    <h1>{business.business_name}</h1>
                    <h4>{business.business_category}</h4>
                    <img src={business.business_image} />
                    <h3>{business.business_address}</h3>
                    <h3>{business.business_number}</h3>
                    <h5>{business.business_description}</h5>
                    <h6>
                        {business.reviews.map(review => (
                            <div key={review.id}>
                                Rating: {review.rating} <br />
                                {review.review} <br />
                                <Button variant="danger" onClick={handleDelete}>
                                    Delete
                                </Button>
                            </div>
                        ))}

                    </h6>
                    {user ? (
                        <AddReview business_id={business.id} addReviews={addReviews} />
                    ) : (
                        <Button>Log In or Sign Up to leave review</Button>
                    )}
                </Col>
            </Row>
        </Container>
    );
}
export default BusinessDetail