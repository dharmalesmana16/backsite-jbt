import {
    defineConfig
} from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';
import checker from 'vite-plugin-checker';

export default defineConfig({
    define: {
global: 'window',
},
    plugins: [
        
        laravel({
            input: 'resources/js/app.tsx',
            refresh: true,
        }),
        checker({
            typescript: true,

        }),
        react(),
    ],
});
