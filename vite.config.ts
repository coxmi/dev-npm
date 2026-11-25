import { defineConfig } from 'vite'
import entrypoints from 'vite-plugin-glob-entrypoints'
import less from 'vite-plugin-less-overrides'

const dir = 'httpdocs'

export default defineConfig({
    base: './',
    plugins: [
        entrypoints({
            main: [
                // additional as required
                // `${dir}/components/*/*.{js,jsx,ts,tsx,css,less}`,
                `${dir}/assets/js/main.js`,
                `${dir}/assets/css/main.less`,
            ],
        }),
        less([
            `${dir}/assets/css/breakpoints.less`,
            `${dir}/assets/css/mixins.less`,
            `${dir}/assets/css/variables.less`,
        ]),
    ],
    build: {
        sourcemap: true,
        outDir: `${dir}/assets/dist`,
        manifest: 'manifest.json',
        assetsInlineLimit: 256,
        rolldownOptions: {
            output: {
                entryFileNames: '[name].js',
                assetFileNames: '[name].[ext]',
                chunkFileNames: 'chunks/[name].js',
                // or with hash
                // entryFileNames: '[name].[hash].js',
                // assetFileNames: '[name].[hash].[ext]',
                // chunkFileNames: 'chunks/[name].[hash].js',
            },
        },
    },
})

