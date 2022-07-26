import { useState, useRef, createContext } from 'react';
import { HexColorPicker } from "react-colorful";
import Row from './Row.js';
import {createDogElement} from './SpriteSheet.js';
import { dogCanvas } from './DogCanvas';

export const MouseDownContext = createContext();

function NewDog() {
    const [dogName , setDogName] = useState('')
    const [selectedColor, setColor] = useState("#684220")
    const canvasRef = useRef(null);

    // TODO: refactor to dog design component
    let initialCanvas = () => {
        return dogCanvas.map((row) => row.map((pixel) => !!pixel ? '#fff' : 'transparent'))
    }
    const [pixelCanvas, setPixelCanvas] = useState(initialCanvas())
    const [mouseDown, setMouseDown] = useState(false)

    const inputsHandler = (e) => {
        setDogName( e.target.value )
    }

    const generateDogPattern = pixelCanvas.flat().filter((x) => x !== 'transparent')

    const updateSpriteCanvas = () => {
        let ctx = canvasRef.current.getContext('2d');
        let img = new Image();
        img.onload = () => {
            ctx.drawImage(img, 0, 0, img.width, img.height);
            saveDog()
        }

        img.src = "data:image/svg+xml," + encodeURIComponent(createDogElement(generateDogPattern));
        // return
        // how does async work without a return ?
    }

    const saveDog = async () => {
        canvasRef.current.toBlob((blob) => {
            // create FormData for POST
            const data = new FormData();
            data.append("dog[name]", dogName);
            data.append("dog[pattern]", JSON.stringify(generateDogPattern));
            data.append("dog[image]", blob)
            fetch("http://localhost:3000/api/v1/dogs", {
                method: 'POST',
                body: data,
            })
                .then(response => response.json())
                .then(data => {
                    console.log('this is in the post!', data)
                    // TODO: add dog to park here ?
                })
                .catch((error) => console.error(error))

        }, 'image/png', 0.9)
    }
    

    const onSubmit = (e) => {
        e.preventDefault();
        updateSpriteCanvas();
    }


    // TODO: refactor/move to dog design component
    let rows = [];
    pixelCanvas.forEach((row, i) => {
        rows.push(<Row key={i} rowIndex={i} row={row} selectedColor={selectedColor} pixelCanvas={pixelCanvas} setPixelCanvas={setPixelCanvas} />);
    })
    
    return (
        <div>
            <h1>New Dog</h1>
            <label>Dog Name:</label>
            <input type="text" name="name" onChange={inputsHandler} placeholder="Name" value={dogName} />
            <label htmlFor="image">Image</label>
            <input type="file" name="image" id="image" />
            <MouseDownContext.Provider value={{mouseDown, setMouseDown}}>
                {rows}
            </MouseDownContext.Provider>
            <HexColorPicker color={selectedColor} onChange={setColor} />
            <button onClick={onSubmit}>create dog!</button>
            <canvas id="canvas" className="spriteCanvas" ref={canvasRef} width="80" height="400"></canvas>
        </div>
    );
}

export default NewDog;
