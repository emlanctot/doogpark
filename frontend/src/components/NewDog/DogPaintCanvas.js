import { useState, createContext, useEffect } from 'react'
import { HexColorPicker } from "react-colorful";
import { pixelDog } from './DogTemplates';
import Row from './Row.js';

export const DogPaintCanvasContext = createContext();

export default function DogPaintCanvas({ setDogPattern }) {


  const [selectedColor, setColor] = useState("#684220")
  const [pixelCanvas, setPixelCanvas] = useState(pixelDog.map((row) => row.map((pixel) => !!pixel ? '#fff' : 'transparent')))
  const [mouseDown, setMouseDown] = useState(false)

  useEffect(() => {
    setDogPattern(pixelCanvas.flat().filter((x) => x !== 'transparent'))
  }, [pixelCanvas, mouseDown])

  let rows = [];
  pixelCanvas.forEach((row, i) => {
    rows.push(<Row key={i} rowIndex={i} row={row} selectedColor={selectedColor} pixelCanvas={pixelCanvas} setPixelCanvas={setPixelCanvas} />);
  })

  return (
    <>
      <DogPaintCanvasContext.Provider value={{ mouseDown, setMouseDown, pixelCanvas, setPixelCanvas }}>
        {rows}
      </DogPaintCanvasContext.Provider>
      <HexColorPicker color={selectedColor} onChange={setColor} />
    </>
  )
}
