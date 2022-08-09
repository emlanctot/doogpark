import React, { useRef, useState, useEffect } from 'react';

const scale = 1;
const width = 48;
const height = 48;
const scaledWidth = scale * width;
const scaledHeight = scale * height;

export default function Dog(props) {
    const { image_url } = props;
    const spriteCanvasRef = useRef(null);


    useEffect(() => {
      let img = new Image();
      img.src = image_url
      img.onload = function () {
        dogAvatar(img, 'draw')

      };
    }, [])


    const dogAvatar = (img, action) => { //TODO: add direction
      if (!!spriteCanvasRef && spriteCanvasRef.current) {
        const ctx = spriteCanvasRef.current.getContext('2d');
        // const spriteLine = dir * SPRITE_SIZE; //logic to find which line to use on sprite sheet depending on direction
        let currentFrame = 0;
        let currentTick = 0; //rename this
        const ticksPerFrame = 5;


        const draw = (frame) => {
          if (frame > 4 || frame < 0) frame = 0;
          ctx.clearRect(0, 0, width, height)
          ctx.drawImage(
            img,
            0 * width,
            frame * height,
            width,
            height,
            0,
            0,
            scaledWidth,
            scaledHeight
          )
        }

        const update = () => {
          console.log('currentFrame', currentFrame)
          console.log('currentTick', currentTick)
          currentTick ++;
          if (currentTick > ticksPerFrame){
            currentTick = 0;
            currentFrame ++;
          }
        };

        const main = () => {
          draw(currentFrame);
          update();
          const id = requestAnimationFrame(main);
          if (currentFrame > 5) {
            cancelAnimationFrame(id)
          }
        }

        if (action === 'draw') {
          draw(3);
        }

        if (action === 'animate') {
          main();
        }


      }
    }

  return (
    <div className="parkDog">
        <canvas id="canvas" className="dogSprite" ref={spriteCanvasRef}></canvas>
    </div>
  )
}
