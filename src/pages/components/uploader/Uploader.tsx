import React, { useState } from 'react';
import { VFXImg } from 'react-vfx';

export const Uploader = () => {
  const [imageSrc, setImageSrc] = useState('');
  const onChangeImage = (input: HTMLInputElement) => {
    const maxWidth = 700;
    const maxHeight = 500;
    const files = input.files!;
    const file = files[0];
    if (file.type != 'image/jpeg' && file.type != 'image/png') {
      return;
    }

    const canvas = document.getElementById('area');
    if (!(canvas instanceof HTMLCanvasElement)) {
      throw Error();
    }
    const ctx = canvas!.getContext('2d')!;
    const image = new Image();
    const reader = new FileReader();

    image.src = URL.createObjectURL(file);
    reader.onload = () => {
      image.onload = () => {
        const imageWidth = image.width;
        const imageHeight = image.height;
        let canvasWidth, canvasHeight;
        if (imageWidth > imageHeight) {
          const ratio = image.height / image.width;
          canvasWidth = maxWidth;
          canvasHeight = Math.floor(maxWidth * ratio);
        } else {
          const ratio = image.width / image.height;
          canvasWidth = Math.floor(maxHeight * ratio);
          canvasHeight = maxHeight;
        }
        canvas.width = canvasWidth;
        canvas.height = canvasHeight;
        ctx.drawImage(image, 0, 0, imageWidth, imageHeight, 0, 0, canvasWidth, canvasHeight);
        const readResult = reader.result as string;
        image.src = readResult;
      };
    };
    reader.readAsDataURL(file);
    const resizedImage = canvas.toDataURL();
    setImageSrc(resizedImage);
  };
  return (
    <div>
      <form id="img-form">
        <input type="file" id="img-input" onChange={(e) => onChangeImage(e.target)} />
      </form>
      <canvas id="area" hidden></canvas>
      <VFXImg src={imageSrc} shader="glitch" />
    </div>
  );
};
