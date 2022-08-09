import '../styles/App.scss';
import { useState, createContext, useEffect } from 'react';
import NewDog from './NewDog/Index.js';
import Park from './Park/Park.js';
import Index from './Park/Index.js';

export const ParkContext = createContext();

function App() {
  const [openCreateModal, setOpenCreateModal] = useState(false)
  const [parkDogs, setParkDogs] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/api/v1/dogs')
      .then((response) => response.json())
      .then((actualData) => setParkDogs(actualData))
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  console.log(parkDogs)
  return (
    <div className="App">
      <h2>butts :)</h2>
      <ParkContext.Provider value={{ parkDogs, setParkDogs }}>
        <NewDog />
        <Index />
        <Park />
      </ParkContext.Provider>
    </div> 
  );
}

export default App;