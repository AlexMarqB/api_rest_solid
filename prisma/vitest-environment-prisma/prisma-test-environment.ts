import { Environment } from "vitest/environments";

// Será executa antes de cada teste dentro da pasta configurada no vite.config.ts

export default <Environment> {
    name: 'prisma',
    transformMode: 'ssr',
    async setup() {
        console.log('Setting up Prisma Test Environment');
        return {
            async teardown() {
                console.log('Tearing down Prisma Test Environment');
            }
        }
    },
}