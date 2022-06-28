import { useState } from 'react';
import { HexColorPicker } from "react-colorful";
import Row from './Row.js';
import { dogCanvas } from './DogCanvas';

function NewDog() {

    const [inputField , setInputField] = useState({
        name: '',
    })

    const inputsHandler = (e) => {
        setInputField( {[e.target.name]: e.target.value} )
    }

    const submitButton = () => {
        alert(inputField.first_name)
    }

    const [selectedColor, setColor] = useState("#684220")

    let initialCanvas = () => {
        return dogCanvas.map((row) => row.map((pixel) => !!pixel ? '#fff' : '#888'))
    }

    const [pixelCanvas, setPixelCanvas] = useState(initialCanvas())

    let rows = [];
    pixelCanvas.forEach((row, i) => {
        rows.push(<Row key={i} rowIndex={i} row={row} selectedColor={selectedColor} pixelCanvas={pixelCanvas} setPixelCanvas={setPixelCanvas} />);
    })
    
  return (
    <div>
        <h1>New Dog</h1>

        <label>Dog Name:</label>
        <input type="text" name="name" onChange={inputsHandler} placeholder="Name" value={inputField.name} />

        {rows}
        <HexColorPicker color={selectedColor} onChange={setColor} />
        <button onClick={submitButton}>create dog!</button>
    </div>


);
}

export default NewDog;

// {/* <Editor selectedColor={selectedColor} /> */}
