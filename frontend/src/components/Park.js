import '../styles/Park.scss';
import DogSprite from './DogSprite.js';
import { useState, useEffect } from 'react';

function Park() {
    const [dogs, setDogs] = useState([])

    useEffect(() => {
        fetch('http://localhost:3000/api/v1/dogs')
            .then((response) => response.json())
            .then((actualData) => setDogs(actualData))
            .catch((err) => {
                console.log(err.message);
            });
    }, []);

    return (
        <div className="park">
            {dogs.map((dog, i) => {
                return (
                    <DogSprite
                        key={i}
                        id={dog.id}
                        name={dog.name}
                        facing={dog.facing}
                        x={dog.x}
                        y={dog.y}
                    />
                )
            })}

        </div>
    );
}

export default Park;
