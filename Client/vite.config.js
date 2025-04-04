import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(),  tailwindcss(),],
  build: {
    assetsInclude: ['**/*.png', '**/*.jpg', '**/*.svg'], // Optional for custom assets
  },
});