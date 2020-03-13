import React from 'react';

export const Uploader = () => {
  const maxWidth = 1920;
  const maxHeight = 1080;
  const onChangeImage = (input: HTMLInputElement) => {
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
          canvasHeight = maxWidth * ratio;
        } else {
          const ratio = image.width / image.height;
          canvasWidth = maxHeight * ratio;
          canvasHeight = maxHeight;
        }
        canvas.width = imageWidth;
        canvas.height = imageHeight;
        ctx.drawImage(image, 0, 0, imageWidth, imageHeight, 0, 0, canvasWidth, canvasHeight);
        const readResult = reader.result as string;
        image.src = readResult;
      };
    };
    reader.readAsDataURL(file);
  };
  return (
    <div>
      <form id="img-form">
        <input type="file" id="img-input" onChange={(e) => onChangeImage(e.target)} />
      </form>
      <canvas id="area"></canvas>
    </div>
  );
};
