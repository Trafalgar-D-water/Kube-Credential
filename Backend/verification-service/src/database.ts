import { Pool } from 'pg';

import dotenv from 'dotenv';
dotenv.config({ path: '../.env' });

const connectionString = process.env.DATABASE_URL 
if (!connectionString) {
  throw new Error('DATABASE_URL env var is required for PostgreSQL connection');
}

const sslMode = process.env.PGSSLMODE;
const pool = new Pool({
  connectionString,
  ssl: sslMode === 'disable' ? false : { rejectUnauthorized: false }
});

export async function initializeDatabase(){
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

