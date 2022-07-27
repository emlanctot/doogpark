import '../styles/App.scss';
import { useState } from 'react';
import NewDog from './NewDog/Index.js';
import Park from './Park.js';


function App() {
  const [openCreateModal, setOpenCreateModal] = useState(false)

  return (
    <div className="App">
      <h2>butts :)</h2>
      <NewDog />
      <Park />
    </div> 
  );
}

export default App;
