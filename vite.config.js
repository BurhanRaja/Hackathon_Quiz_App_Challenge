import { defineConfig } from 'vite';
import { join, resolve } from 'path';

export default defineConfig({
  root: join(process.cwd(), 'src'),
  server: {
    port: 3000,
    open: '/index.html',
  },
  preview: {
    port: 8080,
  },
  build: {
    outDir: join(process.cwd(), 'dist'),
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'src/index.html'),
        quiz: resolve(__dirname, 'src/quiz.html'),
        score: resolve(__dirname, 'src/score.html')
      },
    },
  },
});
