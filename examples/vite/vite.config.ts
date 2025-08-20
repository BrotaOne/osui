import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import inspect from 'vite-plugin-inspect';

// https://vite.dev/config/
export default defineConfig({
    plugins: [react(), inspect()],
    css: {
        preprocessorOptions: {
            less: {
                modifyVars: {
                    'ant-prefix': 'ant',
                },
                javascriptEnabled: true,
            },
        },
    },
})
