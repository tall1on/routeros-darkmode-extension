import {nodeResolve} from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import postcss from 'rollup-plugin-postcss';
import autoprefixer from 'autoprefixer';
import copy from 'rollup-plugin-copy';

const contentConfig = {
    input: 'src/content/index.ts',
    output: {
        file: 'dist/content/index.js',
        format: 'iife',
        sourcemap: true
    },
    plugins: [
        nodeResolve({
            browser: true
        }),
        commonjs(),
        typescript({
            tsconfig: './tsconfig.json',
            declaration: false
        }),
        postcss({
            extract: 'css/routeros-dark.css',
            minimize: false,
            sourceMap: true,
            extensions: ['.css', '.scss'],
            use: {
                sass: {}
            },
            plugins: [autoprefixer()]
        }),
        copy({
            targets: [
                {src: 'src/manifest.json', dest: 'dist'},
                {src: 'src/assets/icons/*', dest: 'dist/assets/icons'}
            ],
            copyOnce: false
        })
    ],
    watch: {
        clearScreen: false
    }
};

const backgroundConfig = {
    input: 'src/background/serviceWorker.ts',
    output: {
        file: 'dist/background/serviceWorker.js',
        format: 'iife',
        sourcemap: true
    },
    plugins: [
        nodeResolve({
            browser: true
        }),
        commonjs(),
        typescript({
            tsconfig: './tsconfig.json',
            declaration: false
        })
    ],
    watch: {
        clearScreen: false
    }
};

export default [contentConfig, backgroundConfig];