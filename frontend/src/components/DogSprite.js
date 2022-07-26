import '../styles/DogSprite.scss';
import { useState, useRef, useEffect } from 'react';

function DogSprite(props) {
    const { id, name, facing, x, y} = props;
    const [sprite, setSprite] = useState(null)
    const spriteRef = useRef(null);

    useEffect(() => {
        fetch(`http://localhost:3000/api/v1/dogs/${id}`)
            .then((response) => response.json())
            .then((data) => {
                setSprite(data.image_url)
            })
            .catch((err) => console.log(err.message));
    }, []);

    return (
        <div className="dogSprite">
            Dog Name:
            <h5>{name}</h5>
            {!!sprite && <img ref={spriteRef} src={sprite} />}
        </div>
    );
}

export default DogSprite;
