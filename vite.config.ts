import { defineConfig } from 'vite';

export default defineConfig({
    publicDir: 'public',
    build: {
        outDir: 'dist',
        emptyOutDir: false,
        target: 'chrome111',
        minify: true,
        sourcemap: true,
        lib: {
            entry: 'src/content/index.ts',
            formats: ['iife'],
            name: 'RouterOSDarkMode',
            fileName: () => 'content/index.js'
        },
        rolldownOptions: {
            output: {
                assetFileNames: 'content/css/routeros-dark.css'
            }
        }
    }
});
