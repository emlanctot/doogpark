import '../styles/App.scss';
import { useState } from 'react';
import NewDog from './NewDog.js';


function App() {
  const [openCreateModal, setOpenCreateModal] = useState(false)

  return (
    <div className="App">
      <h2>butts :)</h2>
      <NewDog />
    </div> 
  );
}

export default App;
