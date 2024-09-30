import {defineConfig} from 'vitest/config'
import tsconfigPaths from 'vite-tsconfig-paths'

//Configuração para o vitest entender os alias "@/"
export default defineConfig({
    plugins: [
        tsconfigPaths()
    ],
    test: {
        environmentMatchGlobs: [
            //define quais testes devem receber o ambiente de teste prisma e qual arquivo conteu o código de setup e teardown
            ['src/http/controllers/**/*.spec.ts', 'prisma']
        ]
    }
})