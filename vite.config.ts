import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'My Vite App',
        short_name: 'ViteApp',
        description: 'A Progressive Web App built with Vite.',
        icons: [
          {
            src: '/icons/icon-192x192.png',
            type: 'image/png',
            sizes: '192x192'
          },
          {
            src: '/icons/icon-512x512.png',
            type: 'image/png',
            sizes: '512x512'
          }
        ],
        start_url: '/',
        display: 'standalone',
        background_color: '#000000',
        theme_color: '#000000',
        orientation: 'portrait'
      }
    })
  ]
});
