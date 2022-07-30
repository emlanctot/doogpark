import '../styles/DogSprite.scss';
import { useRef, useState, useEffect } from 'react';

function DogSprite(props) {
    const { id, name, facing, x, y, image_url} = props;
    const spriteCanvasRef = useRef(null);

    const scale = 1;
    const width = 48;
    const height = 48;
    const scaledWidth = scale * width;
    const scaledHeight = scale * height;
    
    useEffect(() => {
        let img = new Image();
        img.src = image_url
        const ctx = spriteCanvasRef.current.getContext('2d');

        const drawFrame = (frameX, frameY, canvasX, canvasY) => {
            ctx.drawImage(
                img,
                frameX * width,
                frameY * height,
                width,
                height,
                canvasX,
                canvasY,
                scaledWidth,
                scaledHeight
            );
        }

        const cycleLoop = [0, 1, 2, 3, 4]
        let currentLoopIndex = 0
        let frameCount = 0;

        const run = () => {
            frameCount++;
            if (frameCount < 7) {
                requestAnimationFrame(run);
                return;
            }
            frameCount = 0;
            ctx.clearRect(0,0, width, height)
            drawFrame(0, cycleLoop[currentLoopIndex], 0, 0)
            currentLoopIndex++;
            if (currentLoopIndex >= cycleLoop.length) {
                currentLoopIndex = 0;
            }
            requestAnimationFrame(run)
        }

        img.onload = function () {
            requestAnimationFrame(run);
        };
    }, [])

    return (
        <div className="dogSprite">
            <h4>{name}</h4>
            <img src={image_url} />
            <canvas id="canvas" className="dogSprite" ref={spriteCanvasRef}></canvas>
        </div>
    );
}

export default DogSprite;
