import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  root: 'client',
  plugins: [
    react(),
    VitePWA({
      injectRegister: false,
      registerType: 'prompt',
      manifest: {
        name: 'CNC Manager',
        short_name: 'CNC Manager',
        start_url: './',
        display: 'standalone',
        theme_color: '#142a31',
        background_color: '#eef2f1',
        icons: [192, 512].map(size => ({
          src: `icon-${size}.png`,
          sizes: `${size}x${size}`,
          type: 'image/png',
        })),
      },
      workbox: { globPatterns: ['**/*.{js,css,html,png,webmanifest}'] },
    }),
  ],
});
