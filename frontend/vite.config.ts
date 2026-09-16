import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig(({ command, isPreview }) => ({
    base: command === 'build' || isPreview ? '/S5_Movies/' : '/',
    plugins: [react()],
}))
