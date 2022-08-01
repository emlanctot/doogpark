import { useState, useRef } from 'react';
import DogPaintCanvas from './DogPaintCanvas.js';
import {createDogElement} from './SpriteSheet.js';


function NewDog() {
    const [dogName , setDogName] = useState('')
    const [dogPattern, setDogPattern] = useState(null)
    const canvasRef = useRef(null);

    const inputsHandler = (e) => {
        setDogName( e.target.value )
    }

    const updateSpriteCanvas = () => {
        let ctx = canvasRef.current.getContext('2d');
        let img = new Image();
        img.onload = () => {
            ctx.drawImage(img, 0, 0, img.width, img.height);
            saveDog()
        }
        img.src = "data:image/svg+xml," + encodeURIComponent(createDogElement(dogPattern));
    }

    const saveDog = async () => {
        canvasRef.current.toBlob((blob) => {
            // create FormData for POST
            const data = new FormData();
            data.append("dog[name]", dogName);
            data.append("dog[pattern]", JSON.stringify(dogPattern));
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

    return (
        <div>
            <h1>New Dog</h1>
            <label>Dog Name:</label>
            <input type="text" name="name" onChange={inputsHandler} placeholder="Name" value={dogName} />
            <DogPaintCanvas dogPattern={dogPattern} setDogPattern={setDogPattern} />
            <button onClick={onSubmit}>create dog!</button>
            <canvas id="canvas" className="spriteCanvas" ref={canvasRef} width="48" height="240"></canvas>
        </div>
    );
}

export default NewDog;
