const { PrismaClient } = require('@prisma/client');
const { PrismaPg } = require('@prisma/adapter-pg');
const { Pool } = require('pg');
require('dotenv').config();

console.log('DATABASE_URL:', process.env.DATABASE_URL ? 'Defined' : 'Undefined');

async function main() {
    try {
        const connectionString = process.env.DATABASE_URL;
        const pool = new Pool({ connectionString });
        const adapter = new PrismaPg(pool);
        const prisma = new PrismaClient({ adapter });

        console.log('PrismaClient instantiated successfully');

        await prisma.$connect();
        console.log('Successfully connected to DB');
        await prisma.$disconnect();
        await pool.end();
    } catch (e) {
        console.error('Test failed:', e);
        process.exit(1);
    }
}

main();
