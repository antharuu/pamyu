import VueI18nPlugin from '@intlify/unplugin-vue-i18n/vite';
import ViteYaml from '@modyfi/vite-plugin-yaml';
import vue from '@vitejs/plugin-vue';
import {defineConfig} from 'vite';

// https://vitejs.dev/config/
export default defineConfig(async () => ({
    plugins: [
        vue(),
        ViteYaml(),
        VueI18nPlugin({})
    ],
    build: {
        target: 'esnext',
        sourcemap: true,
    },

    // Vite options tailored for Tauri development and only applied in `tauri dev` or `tauri build`
    //
    // 1. prevent vite from obscuring rust errors
    clearScreen: false,
    // 2. tauri expects a fixed port, fail if that port is not available
    server: {
        port: 1420,
        strictPort: true,
    },
    // 3. to make use of `TAURI_DEBUG` and other env variables
    // https://tauri.studio/v1/api/config#buildconfig.beforedevcommand
    envPrefix: ['VITE_', 'TAURI_']
}));
