import { Pool } from 'pg';
import dotenv from 'dotenv';
dotenv.config({ path: '../.env' });

// Use DATABASE_URL for Postgres, as provided by Render/other PaaS
// Enable SSL by default for managed Postgres; allow disabling via PGSSLMODE=disable
const connectionString = process.env.DATABASE_URL
console.log(connectionString , 'connectionString')
if (!connectionString) {
    throw new Error('DATABASE_URL env var is required for PostgreSQL connection');
}

const sslMode = process.env.PGSSLMODE;
const pool = new Pool({
    connectionString,
    ssl: sslMode === 'disable' ? false : { rejectUnauthorized: false }
});

export async function initializeDatabase() {
    // Create table if it does not exist
    await pool.query(`
        CREATE TABLE IF NOT EXISTS certifications (
          id SERIAL PRIMARY KEY,
          employeeId TEXT NOT NULL,
          certificationCode TEXT NOT NULL,
          employeeName TEXT NOT NULL,
          certificationName TEXT NOT NULL,
          issuingManager TEXT NOT NULL,
          issuedBy TEXT NOT NULL,
          timestamp BIGINT NOT NULL,
          CONSTRAINT unique_employee_cert UNIQUE (employeeId, certificationCode)
        )
    `);

    return pool;
}
