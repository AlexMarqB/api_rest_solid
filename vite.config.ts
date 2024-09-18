import {defineConfig} from 'vitest/config'
import tsconfigPaths from 'vite-tsconfig-paths'

//Configuração para o vitest entender os alias "@/"
export default defineConfig({
    plugins: [
        tsconfigPaths()
    ]
})