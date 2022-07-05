import { useState, createContext } from 'react';
import { HexColorPicker } from "react-colorful";
import Row from './Row.js';
import { dogCanvas } from './DogCanvas';

export const MouseDownContext = createContext();

function NewDog() {
    const [dogName , setDogName] = useState('')
    const [selectedColor, setColor] = useState("#684220")
    let initialCanvas = () => {
        return dogCanvas.map((row) => row.map((pixel) => !!pixel ? '#fff' : 'transparent'))
    }
    const [pixelCanvas, setPixelCanvas] = useState(initialCanvas())
    const [mouseDown, setMouseDown] = useState(false)
    const [createMessage, setCreateMessage] = useState('')

    const inputsHandler = (e) => {
        setDogName( e.target.value )
    }

    const generateDogPattern = pixelCanvas.flat().filter((x) => x !== 'transparent')

    const createDog = async (e) => {
        e.preventDefault();
        try {
            let response = await fetch("http://localhost:3000/api/v1/dogs", {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    name: dogName,
                    pattern: generateDogPattern,
                }),
            });
            let responseJson = await response.json();
            if (response.status === 200) {
                setCreateMessage('yay dog created!')
            } else {
                setCreateMessage('oops something went wrong')
            }
            console.log(createMessage)
        } catch (error) {
            console.log(error);
        }
    }

    let rows = [];
    pixelCanvas.forEach((row, i) => {
        rows.push(<Row key={i} rowIndex={i} row={row} selectedColor={selectedColor} pixelCanvas={pixelCanvas} setPixelCanvas={setPixelCanvas} />);
    })
    
    return (
        <div>
            <h1>New Dog</h1>
            <label>Dog Name:</label>
            <input type="text" name="name" onChange={inputsHandler} placeholder="Name" value={dogName} />

            <MouseDownContext.Provider value={{mouseDown, setMouseDown}}>
                {rows}
            </MouseDownContext.Provider>
            <HexColorPicker color={selectedColor} onChange={setColor} />
            <button onClick={createDog}>create dog!</button>
        </div>
    );
}

export default NewDog;
