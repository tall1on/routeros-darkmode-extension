import path from 'node:path';
import {nodeResolve} from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import esbuild from 'rollup-plugin-esbuild';
import postcss from 'rollup-plugin-postcss';
import autoprefixer from 'autoprefixer';
import copy from 'rollup-plugin-copy';
import {transform as esbuildTransform} from 'esbuild';

const esbuildCssMinifier = () => ({
    name: 'esbuild-css-minifier',
    async generateBundle(_outputOptions, bundle) {
        const tasks = Object.entries(bundle).map(async ([fileName, asset]) => {
            if (asset.type !== 'asset' || !fileName.endsWith('.css')) {
                return;
            }

            const originalSource = typeof asset.source === 'string'
                ? asset.source
                : asset.source?.toString();

            if (typeof originalSource !== 'string') {
                return;
            }

            const result = await esbuildTransform(originalSource, {
                loader: 'css',
                minify: true,
                sourcemap: true,
                sourcefile: fileName
            });

            const mapFileName = `${fileName}.map`;
            const codeWithMapComment = `${result.code.replace(/\n*$/, '')}\n/*# sourceMappingURL=${path.posix.basename(mapFileName)} */`;

            asset.source = codeWithMapComment;

            if (result.map) {
                bundle[mapFileName] = {
                    type: 'asset',
                    name: undefined,
                    fileName: mapFileName,
                    source: result.map
                };
            }
        });

        await Promise.all(tasks);
    }
});

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
        esbuild({
            tsconfig: 'tsconfig.json',
            target: 'es2020',
            minify: true,
            sourceMap: true
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
        esbuildCssMinifier(),
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
        esbuild({
            tsconfig: 'tsconfig.json',
            target: 'es2020',
            minify: true,
            sourceMap: true
        })
    ],
    watch: {
        clearScreen: false
    }
};

export default [contentConfig, backgroundConfig];