import React from 'react'
import { useState, useContext } from 'react';
import '../../styles/Park.scss';
import { ParkContext } from '../App';
import Dog from '../Dog/Index.js';

const parkWidth = 24
const parkHeight = 12

const Row = ({ rowId }) => {
    let cells = [];
    for (let i = 0; i < parkWidth; i++) {
        cells.push(<Cell key={i} rowId={rowId} cellId={i} />);
    }

    return (
        <div className="row" id={rowId}>
            {cells}
        </div>
    )
}

const Cell = ({ cellId, rowId }) => {
    const { parkDogs } = useContext(ParkContext)
    
    let dog = parkDogs.find(dog => dog.x === rowId && dog.y === cellId);
    return (
        <div className="cell" id={cellId}>
            {!!dog && <Dog image_url={dog.image_url} />}
        </div>
    )
}

export default function Index() {
    const { parkDogs } = useContext(ParkContext)
    let rows = []
    for (let i = 0; i < parkHeight; i++) {
        rows.push(<Row key={i} rowId={i} />);
    }
    return (
        <div>
            <h3>Welcome to doog park!</h3>
            <div className='viewPort' style={{
                width: (window.innerWidth - 100),
                height: (window.innerHeight - 50),
                overflow: 'hidden'
            }}>
                <div className="fullPark">
                    {rows}
                </div>

            </div>
        </div>
    )
}
