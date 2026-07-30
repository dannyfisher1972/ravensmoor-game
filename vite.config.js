import { defineConfig } from 'vite';

export default defineConfig({
  // Served from https://dannyfisher1972.github.io/ravensmoor-game/ on GitHub
  // Pages, so assets must resolve under this sub-path, not the domain root.
  base: '/ravensmoor-game/',
  server: {
    host: true,
    port: 5173
  }
});
