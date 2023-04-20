import { useState, useEffect } from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import Navigation from './components/Navigation/Navigation';
import Authentication from './components/Authentication/Authentication';
import BusinessForm from './components/BuisnessForm/BusinessForm';
import './App.css';

function App() {
  const [businesses, setBusinesses] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch('/businesses')
      .then(resp => resp.json())
      .then(setBusinesses);
  }, []);

  const addBusiness = (business) => setBusinesses(current => [...current, business]);

  const updateUser = (user) => setUser(user);

  return (
    <div className="App">
      <BrowserRouter>
        <Navigation />
        <Switch>
          <Route exact path="/Authentication">
            <Authentication updateUser={updateUser} />
          </Route>
          <Route exact path="/business-form">
            <BusinessForm addBusiness={addBusiness} />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
