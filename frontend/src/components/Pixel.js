import {useState, useContext} from 'react';
import '../styles/Pixel.scss';
import { pixelDog } from './PixelDog';
import { DogPaintCanvasContext } from './DogCanvas';


export default function Pixel(props) {
    const { selectedColor, rowIndex, pixelIndex, pixel} = props;
    
    const [pixelColor, setPixelColor] = useState(pixel);
    const [oldColor, setOldColor] = useState(pixelColor);
    const [canChangeColor, setCanChangeColor] = useState(true);
    const { mouseDown, setMouseDown, pixelCanvas, setPixelCanvas } = useContext(DogPaintCanvasContext)

    function validPixel() {
        return !!pixelDog[rowIndex][pixelIndex]
    }

    function applyColor() {
        if (pixelDog[rowIndex][pixelIndex]) {
            setPixelColor(selectedColor);
            setCanChangeColor(false);
    
            pixelCanvas[rowIndex][pixelIndex] = selectedColor
            console.log('this is applying change to pixel canvas', pixelCanvas)
            setPixelCanvas(pixelCanvas)
        }
    }

    function toggleMouseUp() {
        setMouseDown(false)
    }
    
    function toggleMouseDown() {
        setMouseDown(true)
        applyColor()
    }

    function changeColorOnHover() {
        if (validPixel()) {
            setOldColor(pixelColor);
            setPixelColor(selectedColor);
            if (mouseDown) {
                applyColor()
            }
        }
    }

    function resetColor() {
        if (canChangeColor) {
            setPixelColor(oldColor);
        }
        setCanChangeColor(true);
    }


    return (
        <div 
            className="pixel" 
            id={pixelColor} 
            disabled={!validPixel}
            onMouseDown={toggleMouseDown}
            onMouseUp={toggleMouseUp} 
            onMouseEnter={changeColorOnHover} 
            onMouseLeave={resetColor} 
            style={{
                backgroundColor: pixelColor,
                cursor: (validPixel() ? 'cursor' : 'auto')
            }}>

        </div>
    )
}
