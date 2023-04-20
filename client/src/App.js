import NavBar from './components/NavBar/NavBar';
import Hero from './components/Hero/Hero';
// import Authentication from './components/Authentication/Authentication';
import BusinessForm from './components/BuisnessForm/BusinessForm';
import './App.css';
import { useState, useEffect } from 'react';

function App() {
  const [businesses, setBusinesses] = useState([])
  console.log(businesses)

  useEffect(() => {
    fetch('/businesses')
      .then(resp => resp.json())
      .then(setBusinesses)
  }, [])

  const addBusiness = (business) => setBusinesses(current => [...current, business])

  return (
    <div className="App">
      <NavBar />
      <Hero />
      {/* <Authentication /> */}
      <BusinessForm addBusiness={addBusiness} />
    </div>
  );
}

export default App;
