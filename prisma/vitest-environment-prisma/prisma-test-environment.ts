import { PrismaClient } from '@prisma/client';
import 'dotenv/config'
import { execSync } from 'node:child_process';

import { randomUUID } from "node:crypto";
import { Environment } from "vitest/environments";

// Será executado antes de cada teste dentro da pasta configurada no vite.config.ts

const prisma = new PrismaClient()

function generateDatabaseURL(schema: string) {
    if(!process.env.DATABASE_URL) {
        throw new Error("Please provide a DATABASE_URL environment variable")
    }
    // protocolo://usuario:senha@host:porta/caminho?paramName=paramValue
    // postgresql://docker:docker@localhost:5432/apisolid?schema=public
    const url = new URL(process.env.DATABASE_URL!)
    
    url.searchParams.set('schema', schema)
    
    return url.toString();
}

export default <Environment> {
    name: 'prisma',
    transformMode: 'ssr',
    async setup() {
        const schema = randomUUID()
        const databaseURL = generateDatabaseURL(schema)

        //sobrescrever a variavel de ambiente com a nova

        process.env.DATABASE_URL = databaseURL

        //Agora executamos as migrations do prisma no novo banco de dados isolado 
        //utilizamos o deploy ao invés do dev para ele não verificar as mudanças no banco de dados, ele apenas executa

        execSync('npx prisma migrate deploy')

        return {
            async teardown() {
                await prisma.$executeRawUnsafe(`DROP SCHEMA IF EXISTS "${schema}" CASCADE`) // Deleta o schema e todos os dados internos dele
                await prisma.$disconnect()
            }
        }
    },
}