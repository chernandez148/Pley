import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import Hero from './components/Hero/Hero';
import Navigation from './components/Navigation/Navigation';
import Authentication from './components/Authentication/Authentication';
import BusinessForm from './components/BuisnessForm/BusinessForm';
import BusinessDetail from './components/BuisnessForm/BusinessDetail';
import './App.css';
import BusinessFormEdit from './components/BuisnessForm/BusinessFormEdit';

function App() {
  const [users, setUsers] = useState([]);
  const [businesses, setBusinesses] = useState([]);
  const [businessEdit, setBusinessEdit] = useState(false)
  const [reviews, setReviews] = useState([]);
  const [user, setUser] = useState(null);
  const history = useHistory();

  console.log(user)
  console.log(businesses)
  console.log(reviews)
  console.log(user)

  useEffect(() => {
    fetchUsers()
    fetchUser()
    fetchBusinesses()
    fetchReviews()
  }, [])

  const fetchUsers = () => (
    fetch('/users')
      .then(resp => resp.json())
      .then(setUsers)
  )

  const fetchBusinesses = () => (
    fetch('/businesses')
      .then(resp => resp.json())
      .then(setBusinesses)
  )

  const fetchReviews = () => (
    fetch('/reviews')
      .then(resp => resp.json())
      .then(setReviews)
  )

  const fetchUser = () => (
    fetch('/authorized')
      .then(res => {
        if (res.ok) {
          res.json()
            .then(data => {
              setUser(data)
            })
        } else {
          setUser(null)
        }
      })
  )

  const deleteReview = (delete_review) => setReviews(reviews => reviews.filter((review) => review.id) !== delete_review.id)

  const updateBusiness = (updated_business) => setBusinesses(businesses => businesses.map(business => business.id == updated_business.id ? updated_business : business))

  function handleEdit(business, history) {
    setBusinessEdit(!businessEdit)
    console.log(history)
    history.push(`/businesses/edit/${business}`);
  };


  const addBusiness = (business) => setBusinesses(current => [...current, business]);

  const addReviews = (review) => setReviews(current => [...current, review])

  const updateUser = (user) => setUser(user);

  return (
    <div className='App vh-100'>
      <BrowserRouter>
        <Navigation user={user} updateUser={updateUser} />
        <Switch>
          <Route exact path="/Authentication">
            <Authentication updateUser={updateUser} />
          </Route>
          <Route exact path="/business-form">
            <BusinessForm addBusiness={addBusiness} />
          </Route>
          <Route exact path='/hero'>
            <Hero businesses={businesses} />
          </Route>
          <Route path='/businesses/edit/:id'>
            <BusinessFormEdit businessEdit={businessEdit} updateBusiness={updateBusiness} />
          </Route>
          <Route path='/businesses/:id'>
            <BusinessDetail
              handleEdit={handleEdit}
              businesses={businesses}
              deleteReview={deleteReview}
              reviews={reviews}
              users={users}
              addReviews={addReviews}
              user={user}
              history={history} // pass history object as a prop
            />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
