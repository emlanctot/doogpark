import { useState, useEffect, useRef } from 'react';
import '../../styles/SpriteSheet.scss';
import { dogRunningOne, dogRunningTwo, dogRunningThree, dogRunningFour, dogRunningFive } from './DogTemplates';

const DOG_SPRITES = [dogRunningOne, dogRunningTwo, dogRunningThree, dogRunningFour, dogRunningFive];


export const createDogElement = (pattern) => {
    let dogElement = DOG_SPRITES.map(dogFrame => {
        let patternCopy = pattern.slice();
        let rows = ''
        dogFrame.map(row => {
            let pixels = []
            row.map(pixel => {
                let pixelColor = pixel === 0 ? 'transparent' : patternCopy.shift()
                pixels.push(`<div className="pixel" style="background-color:${pixelColor}; width:0.2rem; height:0.2rem"></div>`)
            })
            rows += '<div className="row" style="display:flex; width:fit-content">' +
                pixels.join('') +
                '</div>'
        })
        return rows
    }).join('');

    return (
        '<svg xmlns="http://www.w3.org/2000/svg" width="1000" height="1000">' +
            '<foreignObject width="100%" height="100%">' +
                '<div xmlns="http://www.w3.org/1999/xhtml">' +
                    (!!pattern ? dogElement : '') +
                '</div>' +
            '</foreignObject>' +
        '</svg>'
    )
}
