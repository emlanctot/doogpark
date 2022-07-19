import '../styles/Park.scss';
import { useState, useEffect } from 'react';

function Park() {
    const [dogs, setDogs] = useState(null)

    useEffect(() => {

        fetch(`http://localhost:3000/api/v1/dogs`)
            .then((response) => response.json())
            .then((actualData) => console.log(actualData))
            .catch((err) => {
                console.log(err.message);
            });
    }, []);

    return (
        <div className="park">
            poo
        </div>
    );
}

export default Park;
