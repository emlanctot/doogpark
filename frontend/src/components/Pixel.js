import {useState, useContext} from 'react';
import '../styles/Pixel.scss';
import { dogCanvas } from './DogCanvas';
import { MouseDownContext } from './NewDog';


export default function Pixel(props) {
    const { selectedColor, rowIndex, pixelIndex, pixel, pixelCanvas, setPixelCanvas} = props;
    
    const [pixelColor, setPixelColor] = useState(pixel);
    const [oldColor, setOldColor] = useState(pixelColor);
    const [canChangeColor, setCanChangeColor] = useState(true);
    const {mouseDown, setMouseDown} = useContext(MouseDownContext)

    function validPixel() {
        return !!dogCanvas[rowIndex][pixelIndex]
    }

    function applyColor() {
        if (dogCanvas[rowIndex][pixelIndex]) {
            setPixelColor(selectedColor);
            setCanChangeColor(false);
    
            pixelCanvas[rowIndex][pixelIndex] = selectedColor
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
