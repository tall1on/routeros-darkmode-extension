import { defineConfig } from 'vite';

export default defineConfig({
    publicDir: false,
    build: {
        outDir: 'dist',
        emptyOutDir: false,
        target: 'chrome111',
        minify: true,
        sourcemap: true,
        lib: {
            entry: 'src/background/serviceWorker.ts',
            formats: ['iife'],
            name: 'RouterOSDarkModeServiceWorker',
            fileName: () => 'background/serviceWorker.js'
        }
    }
});
