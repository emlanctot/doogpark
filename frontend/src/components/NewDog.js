import { useState, createContext } from 'react';
import { HexColorPicker } from "react-colorful";
import Row from './Row.js';
import { dogCanvas } from './DogCanvas';

export const MouseDownContext = createContext();

function NewDog() {
    const [inputField , setInputField] = useState({name: ''})
    const [selectedColor, setColor] = useState("#684220")
    let initialCanvas = () => {
        return dogCanvas.map((row) => row.map((pixel) => !!pixel ? '#fff' : '#888'))
    }
    const [pixelCanvas, setPixelCanvas] = useState(initialCanvas())
    const [mouseDown, setMouseDown] = useState(false)

    const inputsHandler = (e) => {
        setInputField( {[e.target.name]: e.target.value} )
    }

    const submitButton = () => {
        alert(inputField.first_name)
    }

    let rows = [];
    pixelCanvas.forEach((row, i) => {
        rows.push(<Row key={i} rowIndex={i} row={row} selectedColor={selectedColor} pixelCanvas={pixelCanvas} setPixelCanvas={setPixelCanvas} />);
    })
    
    return (
        <div>
            <h1>New Dog</h1>

            <label>Dog Name:</label>
            <input type="text" name="name" onChange={inputsHandler} placeholder="Name" value={inputField.name} />

            <MouseDownContext.Provider value={{mouseDown, setMouseDown}}>
                {rows}
            </MouseDownContext.Provider>
            <HexColorPicker color={selectedColor} onChange={setColor} />
            <button onClick={submitButton}>create dog!</button>
        </div>
    );
}

export default NewDog;
