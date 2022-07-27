import Pixel from "./Pixel";
import '../../styles/Row.scss';

export default function Row(props) {
    const { selectedColor, rowIndex, row } = props;

    let pixels = [];
    row.forEach((pixel, i) => {
        pixels.push(<Pixel key={i} selectedColor={selectedColor} rowIndex={rowIndex} pixelIndex={i} pixel={pixel} />)
    })
    
    return (
        <div className="row">
            {pixels}
        </div> 
    )
}