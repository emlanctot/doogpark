import {useState} from 'react';
import '../styles/Pixel.scss';
import { dogCanvas } from './DogCanvas';


export default function Pixel(props) {
    const { selectedColor, rowIndex, pixelIndex, pixel, pixelCanvas, setPixelCanvas} = props;
    
    const [pixelColor, setPixelColor] = useState(pixel);
    const [oldColor, setOldColor] = useState(pixelColor);
    const [canChangeColor, setCanChangeColor] = useState(true);
    const [mouseDown, setMouseDown] = useState(false)
    
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
        console.log('mouse going up!')
        setMouseDown(false)
    }
    
    function toggleMouseDown() {
        console.log('beep beep mouse down')
        setMouseDown(true)
        applyColor()
    }

    function changeColorOnHover() {
        if (validPixel()) {
            setOldColor(pixelColor);
            setPixelColor(selectedColor);
            console.log('hi dog', mouseDown)
            if (mouseDown) {
                console.log('mouse is down and we should apply color!')
                applyColor()
            }
            // check if mouse is down and then apply color change on hover
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
            disabled={(dogCanvas[rowIndex][pixelIndex] ? false : true)}
            onMouseDown={toggleMouseDown}
            onMouseUp={toggleMouseUp} 
            onMouseEnter={changeColorOnHover} 
            onMouseLeave={resetColor} 
            style={{backgroundColor: pixelColor}}>

        </div>
    )
}
