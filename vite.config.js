import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vite.dev/config/
export default defineConfig({
    plugins: [react(), tsconfigPaths()],
    test: {
        environment: 'jsdom', // DOM環境を提供
        setupFiles: './vitest.setup.js',
        css: true, // CSS importを許容
        globals: true, // グローバルにdescribeやtestを使えるようにする
    },
    base: '/gen-password/',
});
