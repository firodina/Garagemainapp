import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    assetsInclude: ['**/*.png', '**/*.jpg', '**/*.svg'], // Optional for custom assets
  },
});