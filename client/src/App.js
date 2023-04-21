import { useState, useEffect } from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import Hero from './components/Hero/Hero';
import Navigation from './components/Navigation/Navigation';
import Authentication from './components/Authentication/Authentication';
import BusinessForm from './components/BuisnessForm/BusinessForm';
import './App.css';

function App() {
  const [businesses, setBusinesses] = useState([]);
  const [user, setUser] = useState(null);
  const [hideOverflow, setHideOverflow] = useState(false)
  console.log(hideOverflow)

  useEffect(() => {
    fetch('/businesses')
      .then(resp => resp.json())
      .then(setBusinesses);
  }, []);

  console.log(businesses)

  const hiddenOveflow = hideOverflow ? "overflow-y-hidden" : ""

  const addBusiness = (business) => setBusinesses(current => [...current, business]);

  const updateUser = (user) => setUser(user);

  return (
    <div className={`App vh-100 ${hiddenOveflow}`}>
      <BrowserRouter>
        <Navigation setHideOverflow={setHideOverflow} />
        <Switch>
          <Route exact path="/Authentication">
            <Authentication updateUser={updateUser} />
          </Route>
          <Route exact path="/business-form">
            <BusinessForm addBusiness={addBusiness} />
          </Route>
          <Route exact path='/hero'>
            <Hero businesses={businesses}/>
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
