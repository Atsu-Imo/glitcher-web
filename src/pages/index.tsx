import React from 'react';
import { VFXProvider } from 'react-vfx';
import { Uploader } from './components/uploader/Uploader';

export default () => (
  <VFXProvider>
    <Uploader />
  </VFXProvider>
);
